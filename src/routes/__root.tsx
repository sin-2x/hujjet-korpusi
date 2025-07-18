import { MainLayout } from "@/widgets";
import { createRootRoute, Link } from "@tanstack/react-router";

export const Route = createRootRoute({
   component: () => <MainLayout />,
   notFoundComponent: () => (
      <div className="relative min-[100%] flex flex-col items-center justify-center bg-white text-green-600 overflow-hidden">
         <div className="z-10 text-center px-4 animate-fade-in-slow">
            <h1 className="text-[120px] font-extrabold animate-bounce-fast">
               404
            </h1>
            <p className="text-2xl font-semibold mb-2 animate-fade-up">
               Страница не найдена
            </p>
            <p className="text-gray-500 mb-6 max-w-md mx-auto animate-fade-up delay-200">
               Кажется, вы свернули не туда. Попробуйте вернуться на главную
               панель.
            </p>
            <Link
               to="/"
               className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all animate-slide-in"
            >
               Вернуться на главную
            </Link>
         </div>
      </div>
   ),
});
