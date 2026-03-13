import React from 'react';

export const OpenSourcePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          Open Infrastructure, Open Code.
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          We believe the tools that manage public resources should be owned by the public.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">

        <h2 className="text-xl font-bold text-slate-900 mb-6">
          GitHub Repository
        </h2>

        <p className="text-slate-600 mb-6">
          Access the full source code for the frontend, backend prediction engine,
          and data pipelines.
        </p>

        <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold">
          View on GitHub
        </button>

      </div>

    </div>
  );
};
