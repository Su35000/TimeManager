import {api} from "./fetch.ts";

export const addingWorkingTim =  async (user: any) => {
    return api.post({endpoint:`/workingTimes/${user.id}`})
}

export const addingWorkingTime = (data:any) => {
    const options = {
        endpoint:`/workingTimes/${data.working_time.user.id}`,
        data
    }
    api.post(options);
}

export const getAllWorkingTime = async (user) => {
    return await api.get({endpoint: `/workingTimes/${user.id}`});
}

export const fetchWorkingTimes = async (userId, start, end) => {
    try {
        // Assurez-vous d'ajuster l'URL selon votre configuration API
        const response = await api.get({endpoint: `/workingTimes/${userId}?start=${start}&end=${end}`});
        return response.data; // Ici, vous obtiendrez les 'working_times' envoyés par votre contrôleur
    } catch (error) {
        // Gérer les erreurs ici, vous pourriez vouloir vérifier error.response pour voir le message d'erreur retourné par l'API
        console.error('Erreur lors de la récupération des horaires de travail', error);
        if (error.response) {
            // La réponse de la requête a été reçue et le serveur a répondu avec un statut de code
            // qui sort de la plage de statut de 2xx
            console.error('Error Response:', error.response.data);
        } else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            console.error('Error Request:', error.request);
        } else {
            // Quelque chose s'est produit lors de la mise en place de la requête qui a déclenché une erreur
            console.error('Error Message:', error.message);
        }
    }
};

export async function getWorkingTimeToday(userId: number) {
    const today = new Date().toISOString().split('T')[0];
    const formattedStartDate = today + 'T00:00:00Z';
    const formattedEndDate = today + 'T23:59:59Z';
    const response = await api.get({endpoint: `/workingTimes/${userId}?start=${formattedStartDate}&end=${formattedEndDate}`});
    return response.data;
}

export const getAllWorkingtimesByUserBetweenDateRange = async(id:number, {start, end}:{start:string, end:string}) => {
    const options = {
        endpoint:`/workingTimes/${id}?start=${start}&end=${end}`,
    }
    return await api.get(options);
}