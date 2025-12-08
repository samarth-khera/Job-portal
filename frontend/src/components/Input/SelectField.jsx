import React from "react";

/**
 * SelectField
 * Props:
 *  - label, name, value, onChange, options: [{value,label}] | string[]
 *  - error
 */
export default function SelectField({ label, name, value, onChange, options = [], error }) {
  const normalized = options.map((o) => (typeof o === "string" ? { label: o, value: o } : o));

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full rounded-lg border px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300
          ${error ? "border-red-400" : "border-gray-200"}`}
      >
        <option value="">Select {label}</option>
        {normalized.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
