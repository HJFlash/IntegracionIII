import React from "react";
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer class="bg-slate-50 rounded-lg shadow m-4">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024. Todos los derechos reservados.
        </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">


                <Link to="/SolicitudUsuario" class="hover:underline me-4 md:me-6">
                    Privacy Policy
                </Link>

                <Link to="/SolicitudUsuario" class="hover:underline me-4 md:me-6">
                    Licensing
                </Link>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;
