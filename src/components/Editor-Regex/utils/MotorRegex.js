export const reemplazarVariables = (template, datos) => {
  return template.replace(
    /{{(.*?)}}/g,

    (_, variable) => {
      const keys = variable.trim().split(".");

      let valor = datos;

      for (const key of keys) {
        valor = valor?.[key];
      }

      if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}T/.test(valor)) {
        return new Date(valor).toLocaleDateString();
      }

      return valor ?? "";
    },
  );
};
