import React from "react";

/**
 * InputField
 * Props:
 *  - label, name, value, onChange (fn: (name, value) => void)
 *  - placeholder, error, type
 */
export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  error,
  type = "text",
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-300
          ${error ? "border-red-400" : "border-gray-200"} bg-white`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
