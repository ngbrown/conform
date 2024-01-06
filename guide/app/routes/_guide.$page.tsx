import {
	type LoaderFunctionArgs,
	type HeadersFunction,
	type MetaFunction,
	json,
} from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getMenu, parse } from '~/markdoc';
import { Markdown } from '~/components';
import { formatTitle, getFileContent } from '~/util';

export const headers: HeadersFunction = ({ loaderHeaders }) => {
	return loaderHeaders;
};

export const meta: MetaFunction = ({ params }) => {
	return [
		{
			title: `Conform Guide - ${formatTitle(params.page ?? '')}`,
		},
	];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
	const file = `docs/${params.page}.md`;
	const readme = await getFileContent(context, file);
	const content = parse(readme);

	return json(
		{
			file,
			content,
			toc: getMenu(content),
		},
		{
			headers: {
				'Cache-Control': 'public, max-age=60',
			},
		},
	);
}

export default function Page() {
	let { content } = useLoaderData<typeof loader>();

	return <Markdown content={content} />;
}
