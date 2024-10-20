import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                // Updating notes
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

                dispatch(onUpdateEvent({ ...calendarEvent, user }));

                return;
            }

            // Creating notes
            const { data } = await calendarApi.post('/events', calendarEvent);
            console.log({ data });
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
        } catch (error) {
            // Error management
            console.log(error);
            Swal.fire('Error', error.response.data?.msg, 'error');
        };
    }

    const startDeletingEvent = async () => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());

            Swal.fire('Deleted', 'Event has been deleted', 'success');
        } catch (error) {
            console.log(error);
            Swal.fire('Error', error.response.data?.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events');

            const events = convertEventsToDateEvents(data.events);

            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error getting events: ', error);
        }
    }

    return {
        //* Props
        events,
        activeEvent,
        hasEventSelected: !!activeEvent?.id,

        //* Methods
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}