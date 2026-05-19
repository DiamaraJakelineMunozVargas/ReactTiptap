import { Extension } from '@tiptap/core'

const UnderlineStyle = Extension.create({
    name: 'underlineStyle',

    addGlobalAttributes() {
        return [
            {
                types: ['textStyle'],
                attributes: {
                    underlineStyle: {
                        default: null,

                        parseHTML: element => {
                            return element.style.textDecorationStyle
                        },

                        renderHTML: attributes => {

                            if (!attributes.underlineStyle) {
                                return {}
                            }

                            return {
                                style: `
                                    text-decoration-line: underline;
                                    text-decoration-style: ${attributes.underlineStyle};
                                `,
                            }
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setUnderlineStyle:
                underlineStyle =>
                    ({ chain }) => {

                        return chain()
                            .setMark('textStyle', {
                                underlineStyle,
                            })
                            .run()
                    },

            unsetUnderlineStyle:
                () =>
                    ({ chain }) => {

                        return chain()
                            .setMark('textStyle', {
                                underlineStyle: null,
                            })
                            .run()
                    },
        }
    },
})

export default UnderlineStyle