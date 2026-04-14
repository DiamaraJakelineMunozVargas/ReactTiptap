import '../styles/Toolbar.css';

const Toolbar = ({ editor, comandos }) => {
	if (!editor) return null;
	return (
		<>
			<nav className="toolbar">
				<div className="left">


					<button onClick={comandos.insertarFormulario} className="btn-modulo">
						<span>Modulo</span>
					</button>

				</div>
				<div className="right">

					<button onClick={comandos.guardar} className='btnGuardar'>
						<span>Guardar</span>
					</button>

				</div>
			</nav>
		</>
	);
};
export default Toolbar;
