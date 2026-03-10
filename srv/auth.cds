using AveCombatienteService from './ave-combatiente';

// Definir roles
annotate AveCombatienteService with @(requires: 'authenticated-user');

// Admin - acceso total
annotate AveCombatienteService.Usuarios with @restrict: [{
    grant: '*',
    to   : 'Admin'
}];

annotate AveCombatienteService.Roles with @restrict: [{
    grant: '*',
    to   : 'Admin'
}];

// Criador - acceso a gestión de aves
annotate AveCombatienteService.Aves with @restrict: [
    {
        grant: [
            'READ',
            'CREATE',
            'UPDATE'
        ],
        to   : 'Criador'
    },
    {
        grant: '*',
        to   : 'Admin'
    },
    {
        grant: 'READ',
        to   : 'Invitado'
    }
];

// Veterinario - acceso a tratamientos
annotate AveCombatienteService.Tratamientos with @restrict: [
    {
        grant: '*',
        to   : 'Veterinario'
    },
    {
        grant: 'READ',
        to   : 'Criador'
    }
];

// Financiero - acceso a transacciones
annotate AveCombatienteService.Transacciones with @restrict: [
    {
        grant: '*',
        to   : 'Financiero'
    },
    {
        grant: 'READ',
        to   : 'Admin'
    }
];

// Invitado - solo lectura
// annotate AveCombatienteService.Aves with @restrict: [
//     { grant: 'READ', to: 'Invitado' }
// ];
