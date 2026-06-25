import { NavLink } from "react-router-dom";

const NavbarCompo = ( ) => {

    return (
        <>
            <header className="navbar bg-base-300 py-8 mb-15">
                <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between">
                    <NavLink className={"text-3xl font-bold"} to={"/"}>
                       BioGénesis
                    </NavLink>
                    <div className="ml-auto flex gap-5 ">
                     
                    </div>

                </div>
            </header>
          
        </>
    );
};

export default NavbarCompo;
