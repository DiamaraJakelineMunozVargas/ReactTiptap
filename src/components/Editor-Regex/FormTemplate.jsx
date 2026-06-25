const FormTemplate = ({
  fields = [],
  values = {},
  onChange,
}) => {
  return (
    <div className="bg-base-300 p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
            {field.label}
          </label>

          <input
            className="input w-full bg-white border-0 focus:outline-none text-black"
            type={field.type || "text"}
            name={field.name}
            value={values[field.name] || ""}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
};

export default FormTemplate;