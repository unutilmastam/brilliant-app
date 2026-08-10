import React from 'react';

export function Field({ label, children, hint }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-ivory/80">{label}</span>
      {children}
      {hint && <span className="text-xs text-ivory/40">{hint}</span>}
    </label>
  );
}

const base =
  'bg-charcoal border border-line rounded-sm px-3.5 py-2.5 text-ivory placeholder:text-ivory/30 focus:border-gold outline-none transition-colors';

export function TextInput(props) {
  return <input {...props} className={`${base} ${props.className || ''}`} />;
}

export function TextArea(props) {
  return <textarea {...props} className={`${base} ${props.className || ''}`} />;
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={`${base} ${props.className || ''}`}>
      {children}
    </select>
  );
}
