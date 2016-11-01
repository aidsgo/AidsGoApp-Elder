const initialIncidents = [
    {
        id: 1,
        name: 'Mr. Wang',
        distance: 500,
        time: new Date(),
        location: {
            lat: 34.214428,
            lon: 108.848311
        },
        taken: false,
        rejected: false,
        volunteer: '',
        resolved: false,
        emergency_call: '18682306880',
        property_management_company_phone: '18691012922',
        images: []
    }, {
        id: 2,
        name: 'Mrs. Rose',
        distance: 800,
        time: new Date(),
        location: {
            lat: 34.214428,
            lon: 108.848311
        },
        taken: false,
        rejected: false,
        volunteer: '',
        resolved: false,
        emergency_call: '18682306880',
        property_management_company_phone: '18691012922',
        images: []
    }, {
        id: 3,
        name: 'Mrs. Tomad',
        distance: 1000,
        time: new Date(),
        location: {
            lat: 34.214428,
            lon: 108.848311
        },
        taken: false,
        rejected: false,
        volunteer: '',
        resolved: false,
        emergency_call: '18682306880',
        property_management_company_phone: '18691012922',
        images: []
    }
];

const incidents = (state = initialIncidents, action) => {
    switch (action.type) {
        case 'ACCEPT_INCIDENT':
            return state.map(incident => {
                if (incident.id !== action.id) {
                    return incident;
                }
                return Object.assign({}, incident, {
                    taken: true
                })
            });
        case 'REJECT_INCIDENT':
            return state.map(incident => {
                if (incident.id !== action.id) {
                    return incident;
                }
                return Object.assign({}, incident, {
                    rejected: true
                })
            });
        case 'RESOLVE_INCIDENT':
            return state.map(incident => {
                if (incident.id !== action.id) {
                    return incident;
                }
                return Object.assign({}, incident, {
                    resolved: true
                })
            });
        case 'UPLOAD_IMAGE':
            return state.map(incident => {
                if (incident.id !== action.id) {
                    return incident;
                }
                return Object.assign({}, incident, {
                    images: [...incident.images, action.image]
                })
            });
        default:
            return state
    }
};

export default incidents;