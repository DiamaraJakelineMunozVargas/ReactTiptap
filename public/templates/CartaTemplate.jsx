function CartaTemplate({
    children,
    nota,
    fechaFormateada,
    printRef
}) {
    return (
        <div
            ref={printRef}
            className="documento-pdf bg-white shadow-2xl"
        >

            <h1 className="text-3xl font-serif mb-8">
                Carta Formal
            </h1>

            <p className="mb-6">
                Santa Cruz, {fechaFormateada}
            </p>

            <p className="mb-10">
                Estimado/a:
            </p>

            {children}

            <div className="mt-16">
                <p>Atentamente,</p>
                <p>{nota.name}</p>
            </div>

        </div>
    )
}

export default CartaTemplate