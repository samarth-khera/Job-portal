import React from "react";

export default function SelectField({ label, name, value, onChange, options = [], error }) {
  const normalized = options.map((o) => (typeof o === "string" ? { label: o, value: o } : o));

  return (
    <div className="mb-5 group">
      <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value ?? ""}
          onChange={(e) => onChange(name, e.target.value)}
          className={`w-full appearance-none rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-300
            ${
              error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            }
          `}
        >
          <option value="">Select {label}</option>
          {normalized.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom Chevron */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500"></span>
          {error}
        </p>
      )}
    </div>
  );
}
