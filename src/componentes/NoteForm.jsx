const NoteForm = () => {
    return (
        <div>
            <form className="bg-base-300 rounded-lg max-w-4xl mx-auto p-10">
                <input
                    className="block w-full mb-8 input lg:input-lg focus: ring-0 focus: outline-0 border-0"
                    placeholder="Nombre"
                    type="text"
                    id="name"
                    name="name"
                    required
                ></input>
                <input
                    className="block w-full mb-8 input lg:input-lg focus: ring-0 focus: outline-0 border-0"
                    placeholder="Titulo"
                    type="text"
                    id="title"
                    name="title"
                    required
                ></input>
                {/* <textarea
        className=""

        ></textarea> */}
            </form>
        </div>
    );
};

export default NoteForm;
