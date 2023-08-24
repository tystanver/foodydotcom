
"use client"
import Link from "next/link";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const MenuData = () => {
//   const router = useRouter();
  // console.log(router.pathname)
  return (
    <div>
      <ul className="mt-4 pl-[20px] lg:pt-4 mr-6">
        <Link
          href="/"
          className="font-medium text-[20px]"
        >
          
          Dashboard
        </Link>
        <div className="font-medium text-[20px] mt-9 mb-4">Order Management</div>
        <Link href="/dashboard/addfood">
          <li
         className="mb-2 text-lg font-medium"
          >
            <span className="mr-2"><AddCircleIcon/></span>
            Add Food
          </li>
        </Link>
        <Link href="/dashboard/orderplacement">
          <li
          className="mb-2 text-lg font-medium"
          >
            <span className=" mr-2 "><BorderColorIcon/></span>
            Order Placement
          </li>
        </Link>
        <Link href="/dashboard/allorder">
          <li
         className="mb-2 text-lg font-medium"
          >
            <span className="mr-2"><InventoryIcon/></span>
            All Order
          </li>
        </Link>
      </ul>
    </div>
  );
};

const DashboardAsidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-62 h-screen pt-16 transition-transform -translate-x-full bg-slate-400 border-r border-gray-200 md:translate-x-0 ">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-[#F3F3F6] ">
        <ul className="space-y-2 ">
          
          <MenuData />
        </ul>
      </div>
    </aside>
  );
};

export default DashboardAsidebar;
