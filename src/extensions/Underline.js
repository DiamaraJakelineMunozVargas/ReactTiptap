import { Mark, mergeAttributes } from '@tiptap/core'

export const UnderlineStyle = Mark.create({
    name: 'underlineStyle',

    addAttributes() {
        return {
            style: {
                default: 'solid',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-underline]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(HTMLAttributes, {
                'data-underline': '',
                style: `
          text-decoration-line: underline;
          text-decoration-style: ${HTMLAttributes.style};
        `,
            }),
            0,
        ]
    },

    addCommands() {
        return {
            setUnderlineStyle:
                (style) =>
                    ({ commands }) => {
                        return commands.setMark(this.name, {
                            style,
                        })
                    },
        }
    },
})