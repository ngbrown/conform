import type { FieldMetadata } from '@conform-to/react';
import type { ReactNode } from 'react';

interface PlaygroundProps {
	title: string;
	description?: ReactNode;
	form?: string;
	result?: Record<string, unknown>;
	formAction?: string;
	formMethod?: string;
	formEncType?: string;
	children: ReactNode;
}

export function Playground({
	title,
	description,
	form,
	result,
	formAction,
	formMethod,
	formEncType,
	children,
}: PlaygroundProps) {
	return (
		<section
			className="lg:grid lg:grid-cols-2 lg:gap-6 py-8"
			data-playground={title}
		>
			<aside className="flex flex-col">
				<header className="px-4 lg:px-0">
					<h3 className="text-lg font-medium leading-6 text-gray-900">
						{title}
					</h3>
					<div className="mt-4 mb-2 text-sm text-gray-600">{description}</div>
				</header>
				{result ? (
					<pre
						className={`m-4 border-l-4 overflow-x-scroll ${
							result.status === 'error'
								? 'border-pink-600'
								: 'border-emerald-500'
						} pl-4 py-2 mt-4`}
					>
						{JSON.stringify(result, null, 2)}
					</pre>
				) : null}
			</aside>
			<div>
				<main className="shadow lg:rounded-md">
					<div className="mt-5 lg:mt-0 lg:col-span-2 px-4 py-5 bg-white lg:p-6">
						{children}
					</div>
					<footer className="px-4 py-3 bg-gray-50 flex flex-row lg:px-6 gap-2">
						<button
							type="reset"
							className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							form={form}
						>
							Reset
						</button>
						<button
							type="submit"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							form={form}
							formAction={formAction}
							formMethod={formMethod}
							formEncType={formEncType}
						>
							Submit
						</button>
					</footer>
				</main>
			</div>
		</section>
	);
}

interface FieldProps {
	label: string;
	inline?: boolean;
	meta?: FieldMetadata<any, any>;
	children: ReactNode;
}

export function Field({ label, inline, meta, children }: FieldProps) {
	return (
		<div className="mb-4">
			<div
				className={
					inline
						? 'flex flex-row justify-between items-center gap-8 whitespace-nowrap'
						: ''
				}
			>
				<label
					htmlFor={meta?.id}
					className="block text-sm font-medium text-gray-700"
				>
					{label}
				</label>
				{children}
			</div>
			<div id={meta?.errorId} className="my-1 space-y-0.5">
				{!meta?.errors?.length ? (
					<p className="text-pink-600 text-sm" />
				) : (
					meta.errors.map((message) => (
						<p className="text-pink-600 text-sm" key={message}>
							{message}
						</p>
					))
				)}
			</div>
		</div>
	);
}

interface AlertProps {
	id?: string;
	errors: string[] | undefined;
}

export function Alert({ id, errors }: AlertProps) {
	return (
		<div
			id={id}
			className={
				errors?.length
					? 'flex gap-4 bg-red-100 text-red-500 text-sm p-4 mb-4 rounded align-top'
					: 'hidden'
			}
		>
			<span>❌</span>
			<div className="space-y-1">
				{!errors?.length ? (
					<p></p>
				) : (
					errors.map((message, index) => <p key={index}>{message}</p>)
				)}
			</div>
		</div>
	);
}
