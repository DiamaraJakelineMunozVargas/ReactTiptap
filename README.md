# EDITOR REGEX 

Editor de documentos desarrollado con React y Tiptap.
Permite crear plantillas dinamicas variables personalizadas que posteriormente pueden ser reemplazados por datos reales mediante expresiones regulares. 
## Características

- Editor de texto enriquecido basado en Tiptap
- Variables dinámicas
- Sistema de reemplazo mediante Regex
- Impresión de documentos
- Inserción de imágenes
- Formularios reutilizables
- Componentes completamente modulares
- Integración con cualquier API o backend
- Ribbon al estilo word
## Instalación

- npm install
- npm run dev
### Otros tipos de instalaciones: 
#### Usando npm
```
npm install @floating-ui/react @tailwindcss/vite @tiptap/extension-color @tiptap/extension-font-family @tiptap/extension-highlight @tiptap/extension-image @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extension-underline @tiptap/pm @tiptap/react @tiptap/starter-kit axios html2pdf.js lucide-react react react-dom react-hotkeys-hook react-loading-indicators react-qr-code react-rnd react-router-dom react-select react-to-print react-toastify sass tailwindcss tiptap-extension-resize-image

npm install -D @eslint/js @types/react @types/react-dom @vitejs/plugin-react daisyui eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals sass-embedded vite
```
#### Usando pnpm
```
pnpm add @floating-ui/react @tailwindcss/vite @tiptap/extension-color @tiptap/extension-font-family @tiptap/extension-highlight @tiptap/extension-image @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extension-underline @tiptap/pm @tiptap/react @tiptap/starter-kit axios html2pdf.js lucide-react react react-dom react-hotkeys-hook react-loading-indicators react-qr-code react-rnd react-router-dom react-select react-to-print react-toastify sass tailwindcss tiptap-extension-resize-image

pnpm add -D @eslint/js @types/react @types/react-dom @vitejs/plugin-react daisyui eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals sass-embedded vite
```
#### Núcleo y Extensiones de TipTap
Este bloque instala el editor TipTap junto con el Starter Kit y las extensiones personalizadas de estilos, alineación, color, subíndices e imágenes redimensionables.

```
npm install @tiptap/core @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-color @tiptap/extension-font-family @tiptap/extension-highlight @tiptap/extension-image @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extension-underline tiptap-extension-resize-image
```
#### Interfaz, Estilos y UI (Tailwind v4 & DaisyUI)
Librerías encargadas del diseño visual de la barra de herramientas (Ribbon), menús flotantes, dropdowns y componentes interactivos.

```
npm install @floating-ui/react lucide-react sass tailwindcss @tailwindcss/vite
npm install -D daisyui sass-embedded
```

#### Funcionalidades del Sistema e Impresión
Herramientas críticas para la navegación, peticiones HTTP, generación de PDFs, códigos QR, componentes arrastrables/redimensionables (react-rnd) y el sistema de alertas.

```
npm install axios react-router-dom html2pdf.js react-to-print react-qr-code react-rnd react-hotkeys-hook react-loading-indicators react-toastify
```

#### Entorno de Desarrollo (Vite, React 19 y Linters)
Paquetes requeridos estrictamente para compilar el proyecto y mantener la calidad del código limpio.

```
npm install react react-dom
npm install -D vite @vitejs/plugin-react eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals @types/react @types/react-dom
```


## Estructura 
 
```
└── 📁src
    └── 📁components
        └── 📁Editor-Regex
            └── 📁extensions
                ├── Underline.js
            └── 📁RibbonWord
                └── 📁componentsWord
                    ├── BoldButton.jsx
                    ├── FontColorPicker.jsx
                    ├── FontFamilySelect.jsx
                    ├── FontSizeAdjust.jsx
                    ├── FontSizeSelect.jsx
                    ├── HeadingSelect.jsx
                    ├── HighlightButton.jsx
                    ├── HorizontalRuleButton.jsx
                    ├── InsertImageButton.jsx
                    ├── InsertVariableSelect.jsx
                    ├── ItalicButton.jsx
                    ├── StrikeButton.jsx
                    ├── SubscriptButton.jsx
                    ├── SuperscriptButton.jsx
                    ├── TextAlignGroup.jsx
                    ├── UnderlineSelect.jsx
                └── 📁tabs
                    ├── HomeTabs.jsx
                ├── BulletListButton.jsx
                ├── RibbonButton.jsx
                ├── RibbonGroup.jsx
                ├── RibbonTabs.jsx
                ├── RibbonWord.jsx
                ├── SpliButton.jsx
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
    └── 📁interfaces
        ├── paciente.js
        ├── plantillas.js
        ├── reporte.js
    └── 📁pages
        ├── EditPlantilla.jsx
        ├── Inicio.jsx
        ├── NewPlantilla.jsx
        ├── reports.jsx
    └── 📁services
        ├── api.js
        ├── pacienteService.js
        ├── plantillaServiceClass.js
        ├── reportService.js
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── scss.d.ts
```


## Arquitectura

El proyecto fue diseñado bajo una arquitectura modular.

### Components

Contienen componentes reutilizables y no conocen nada sobre APIs, Axios o bases de datos.

Ejemplos:

- EditorRegex
- WordToolbar
- FormTemplate
- ModalComponente
- List

#### Carpeta Editor-Regex 

Esta carpeta se creo con el proposito de guardar todo lo relacionado al editor-regex, mas que todo para organizacion. 

Dentro de esta carpeta se encuentra lo siguiente: 
- Componentes Word 
- Extensiones 
- Styles 
- utils 
- EditorRegex
- Formulario 
- Tiptap 
- RibbonWord
- Documento

##### Componentes Word 
Los componentes de Word son las herramientas basicas que tiene un editor de texto, basado en el tradicional Microsoft Word, se creo esta carpeta para guardar todas estas herramientas, que son las siguientes: 
- FontColorPicker
- FontFamilySelect
- FontSizeAdjust 
- FontSizeSelect 
- HeadingSelect 
- HighlightButon 
- HorizontalRuleButton 
- InsertVariableSelect 
- InsertImageButton 
- SubscripButton 
- Superscriptbutton 
- TextAlignGroup
- UnderlineSelect 

##### Extensiones
Esta carpeta es mas que todo para guardar las extensiones que se usaron en el tiptap.

###### Underline
Es la extension para los subrayados diferentes que cuenta el word tradicional
##### Utils

Dentro de la carpeta **utils** tenemos nuestro motor regex 
###### Motor Regex
```
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
```
La función **reemplazarVariables** es un motor de renderizado de plantillas ligero. Recibe una cadena de texto (template) que contiene marcadores de posición con formato de llaves dobles {{ objeto.propiedad }} y un objeto con información (datos). Su objetivo es buscar todos los marcadores en la plantilla y reemplazarlos dinámicamente con los valores reales correspondientes.

Además, cuenta con un formateador automático que detecta si el valor es una fecha en formato ISO y la transforma a un formato local legible.





### Pages

Actúan como contenedores visuales.
- CreatePage 

Son responsables de conectar componentes con datos.

Ejemplos:

- Inicio
- Reports
- NewPlantilla
- EditPlantilla

### Services

Encapsulan todas las llamadas HTTP.

Ejemplos:

- plantillaService
- pacienteService
- reportService

Esto permite reutilizar los componentes en cualquier proyecto sin modificar su código interno.
