const List = ({ data, setSelectedNote }) => {
    // {data}
    return (
        <div className="bg-base-100 w-full ">
            <ul className="list bg-base-100 rounded-box shadow-md">


                {data.map((note) => (
                    <li
                        key={note._id}
                        onClick={() => {
                            console.log("CLIC EN NOTA:", note.title, note.name);
                            window.open(
                                `/reports/${note._id}`,
                                "_blank",
                                "width=800,height=600,resizable=yes"
                            );
                        }}
                        className="list-row hover:bg-base-200 transition cursor-pointer"
                    >
                        <div className="avatar">
                            <div className="w-15 rounded-full">
                                <img src="https://i.pravatar.cc/100" />
                            </div>
                        </div>

                        <div>
                            <div className="font-semibold text-accent lg: text-2xl" id="name">
                                {note.name}
                                {/* {note.name} */}
                            </div>

                            <div className="text-lg">
                                {note.title}
                                {/* {note.title} */}
                            </div>


                        </div>
                        <div className=" flex justify-between items-end text-xs opacity-60 p-2 ">
                            {new Date(note.fechaNacimiento).toLocaleDateString()}
                        </div>

                        {/* <button className="btn btn-primary btn-sm">Abrir</button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default List;