import '../styles/Toolbar.css';

const Toolbar = ({ editor, comandos }) => {


	return (
		<nav className="toolbar">
			<div className="left">

				<button onClick={comandos.mostrarReceta} className="btn-modulo">
					<span>Modulo</span>
				</button>
			</div>

			<div className="right">

				<button
					onClick={() => editor && comandos.guardar()}
					className='btnGuardar'
					style={{ opacity: editor ? 1 : 0.5 }}
				>
					<span>Guardar</span>
				</button>
			</div>
		</nav>
	);
};

export default Toolbar;