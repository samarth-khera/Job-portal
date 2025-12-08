import React from "react";

/**
 * TextareaField
 * Props:
 *  - label, name, value, onChange, placeholder, rows, error
 */
export default function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 5,
  error,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300
         ${error ? "border-red-400" : "border-gray-200"} bg-white`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
