import { Dashboard } from "@/components";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Workspace } from "@/components/cards/workspace";
import Image from "next/image";

export default function Home() {
  const breadcrumbItems = [{ label: "Inicio" }];
 

  return (
    <div className="p-6 space-y-4">
    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card bg-primary text-primary-content shadow-md">
        <div className="card-body">
          <h2 className="card-title">Total Pets</h2>
          <p>120</p>
        </div>
      </div>
      <div className="card bg-secondary text-secondary-content shadow-md">
        <div className="card-body">
          <h2 className="card-title">Appointments Today</h2>
          <p>8</p>
        </div>
      </div>
      <div className="card bg-accent text-accent-content shadow-md">
        <div className="card-body">
          <h2 className="card-title">New Owners</h2>
          <p>3</p>
        </div>
      </div>
    </div>

    {/* Upcoming Appointments */}
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Upcoming Appointments</h2>
        <ul>
          <li className="flex justify-between p-2 border-b">
            <span>Fluffy - John Doe</span>
            <span>10:00 AM</span>
          </li>
          <li className="flex justify-between p-2 border-b">
            <span>Buddy - Jane Smith</span>
            <span>11:30 AM</span>
          </li>
          <li className="flex justify-between p-2">
            <span>Luna - Maria Gomez</span>
            <span>02:00 PM</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Recent Activity</h2>
        <ul>
          <li>New pet registered: Bella - Owner: Mark Lee</li>
          <li>Treatment completed: Max - Vaccination</li>
          <li>Appointment scheduled: Charlie - 03:00 PM</li>
        </ul>
      </div>
    </div>
  </div>
   
  );
}
