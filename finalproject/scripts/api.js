/*jshint esversion: 8 */

export async function getDestinations() {

// scripts/api.js

// Usamos 'export' para cumplir con el requisito de ES Modules
export async function getDestinations() {
    const url = 'data/destinations.json';
    
    // Requisito: try...catch block para manejar errores
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.destinations;
    } catch (error) {
        console.error("Error fetching destinations data:", error);
        return []; // Retorna un array vacío si falla
    }
}