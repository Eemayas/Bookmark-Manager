// Reusable InputField component
export const InputField: React.FC<{
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, type = "text", placeholder, value, onChange }) => (
  <div className="col-span-2">
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-100 dark:border-gray-500 dark:bg-gray-600"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

// Reusable TextAreaField component
export const TextAreaField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <div className="col-span-2">
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      rows={4}
      className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-100 dark:border-gray-500 dark:bg-gray-600"
      placeholder="Write product description here"
      value={value}
      onChange={onChange}
    ></textarea>
  </div>
);
