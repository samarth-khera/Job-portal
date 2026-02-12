import React from "react";

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
    <div className="mb-5 group">
      <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-300
          ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          }
          placeholder-gray-400
        `}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500"></span>
          {error}
        </p>
      )}
    </div>
  );
}
