# EDITOR REGEX 
# EditorRegex

Editor de documentos basado en Tiptap con:

- Variables dinámicas
- Impresión
- Guardado personalizado
- Formularios reutilizables
- Arquitectura modular

## Instalación

npm install
npm run dev

## Estructura 
 

```
└── 📁src
    └── 📁components
        └── 📁Editor-Regex
            └── 📁componentsWord
                ├── FontColorPicker.jsx
                ├── FontFamilySelect.jsx
                ├── FontSizeAdjust.jsx
                ├── FontSizeSelect.jsx
                ├── HeadingSelect.jsx
                ├── HighlightButton.jsx
                ├── HorizontalRuleButton.jsx
                ├── InsertImageButton.jsx
                ├── InsertVariableSelect.jsx
                ├── SubscriptButton.jsx
                ├── SuperscriptButton.jsx
                ├── TextAlignGroup.jsx
                ├── UnderlineSelect.jsx
            └── 📁extensions
                ├── FontSize.js
                ├── Underline.js
            └── 📁styles
                ├── documento.css
                ├── styletiptap.css
                ├── toolbar.css
            └── 📁utils
                ├── MotorRegex.js
            ├── CreatePage.jsx
            ├── DocumentEditor.jsx
            ├── EditorRegex.jsx
            ├── FormTemplate.jsx
            ├── index.jsx
            ├── Tiptap.jsx
            ├── Wordtoolbar.jsx
        ├── List.jsx
        ├── ModalComponente.jsx
        ├── NavbarCompo.jsx
        ├── SearchComponent.jsx
    └── 📁pages
        ├── EditPlantilla.jsx
        ├── Inicio.jsx
        ├── NewPlantilla.jsx
        ├── reports.jsx
    └── 📁services
        ├── api.js
        ├── pacienteService.js
        ├── plantillaService.js
        ├── reportService.js
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── scss.d.ts
```
