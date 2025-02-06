"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { CalendarApi, DateSelectArg, EventClickArg, EventDropArg } from "@fullcalendar/core/index.js";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { citaService } from "@/application/services/cita/cita";
import { CitaUpdateDTO } from "@/application/dtos/cita/request/citaUpdateDTO";
import { citaRepository } from "@/infrastructure/repositories/cita/cita";

const breadcrumbItems = [
    { label: "Inicio", link: "/home" },
    { label: "Citas" },
];

export default function Home() {
    // const events = [
    //     {
    //         id: "1",
    //         title: "Reunión con equipo",
    //         start: "2025-01-15T14:00:00",
    //         end: "2025-01-15T15:00:00",
    //         color: "#ff9f89",
    //     },
    //     {
    //         id: "2",
    //         title: "Llamada con cliente",
    //         start: "2025-01-18T14:00:00",
    //         end: "2025-01-18T15:00:00",
    //         color: "#87ceeb",
    //     },
    // ];

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await citaService.get();
                setEvents(response as unknown as []);
            } catch (err: unknown) {
                console.log(err);
            } finally {
            }
        };
        getData();
    }, [])

    const handleDateClick = (info: DateClickArg, calendarApi: CalendarApi) => {
        calendarApi.changeView("timeGridDay", info.dateStr);
    };

    const handleEventClick = (info: EventClickArg) => {
        alert(`Evento seleccionado: ${info.event.title} en ${info.event.start}`);
        console.log("Detalles del evento:", info.event);
    };

    const [availableTimes, setAvailableTimes] = React.useState<string[]>([]);

    const handleSelect = (selectionInfo: DateSelectArg) => {
        const calendarApi = selectionInfo.view.calendar;

        if (selectionInfo.view.type !== "timeGridDay") return;

        const hasConflict = calendarApi
            .getEvents()
            .some(
                (event) =>
                    selectionInfo.start < event.end && selectionInfo.end > event.start
            );

        if (hasConflict) {
            alert("Esta hora ya está ocupada.");
            return;
        }

        setAvailableTimes([
            ...availableTimes,
            `${selectionInfo.start.toISOString()} - ${selectionInfo.end.toISOString()}`,
        ]);
        sessionStorage.setItem("start-date", selectionInfo.start.toISOString());
        sessionStorage.setItem("end-date", selectionInfo.end.toISOString());
        redirect("/citas/registrar");

    };


    const handleEventDrop = async (info: EventDropArg) => {
        const { event } = info;
        const calendarApi = info.view.calendar;

        const isConflict = (start: Date, end: Date) =>
            calendarApi
                .getEvents()
                .some(
                    (otherEvent) =>
                        otherEvent.id !== event.id && // Excluir el evento actual
                        start < otherEvent.end! &&
                        end > otherEvent.start!
                );

        if (isConflict(event.start!, event.end!)) {
            // Intentar encontrar un horario disponible
            const maxRetries = 20; // Número máximo de intentos para reubicar el evento (10 horas)
            let retries = 0;
            let newStart = event.start!;
            let foundSlot = false;

            while (retries < maxRetries) {
                // Mover el inicio del evento 30 minutos hacia adelante
                newStart = new Date(newStart.getTime() + 30 * 60 * 1000); // Añadir 30 minutos
                const newEnd = new Date(newStart.getTime() + 30 * 60 * 1000); // Duración fija de 30 minutos

                if (!isConflict(newStart, newEnd)) {
                    event.setStart(newStart);
                    event.setEnd(newEnd);
                    foundSlot = true;
                    break;
                }

                retries++;
            }

            if (foundSlot) {
                alert(
                    `El evento se reubicó automáticamente a la siguiente disponibilidad:\nInicio: ${event.start!.toISOString()}\nFin: ${event.end!.toISOString()}`
                );
            } else {
                alert("No se encontró un horario disponible dentro de los límites establecidos. Revirtiendo cambios.");
                info.revert(); // Revertir el movimiento del evento
            }
        } else {
            // Si no hay conflicto, no es necesario ajustar la duración
            const fechas = {
                citaInicio: new Date(event.start).toISOString(),
                citaFin: new Date(event.end).toISOString(),
            };

            const citaUpdateDTO = new CitaUpdateDTO(fechas);

            await citaRepository.update(event.id, citaUpdateDTO);

            alert(`Evento actualizado: ${event.title}`);
            console.log("Evento actualizado:", {
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
            });
        }
    };



    return (
        <div className="p-6 space-y-2">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="bg-base-100 p-5">

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={esLocale}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridDay",
                    }}
                    timeZone="America/Bogota" // Configuración de la zona horaria
                    events={events}
                    dateClick={(info) => handleDateClick(info, info.view.calendar)}
                    eventClick={handleEventClick}
                    selectable={true}
                    select={handleSelect}
                    editable={true} // Permitir mover eventos
                    eventDrop={handleEventDrop} // Detectar cambios al mover eventos
                    dayMaxEvents={true}
                    slotDuration="00:30:00"
                    slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true, // Mostrar formato de 12 horas
                    }}
                    eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true, // Formato de 12 horas para eventos
                    }}
                />
            </div>
        </div>
    );
}
