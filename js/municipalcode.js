let municipalIdCoding = {
    'BOACO': ['BOACO', 'CAMOAPA', 'SAN JOSE DE LOS REMATES', 'SAN LORENZO', 'SANTA LUCIA', 'TEUSTEPE'],
    'CARAZO': ['DIRIAMBA', 'DOLORES', 'EL ROSARIO', 'JINOTEPE', 'LA CONQUISTA', 'LA PAZ CARAZO', 'SAN MARCOS', 'STA. TERESA'],
    'CHINANDEGA': ['CHICHIGALPA', 'CHINANDEGA', 'CINCO PINOS', 'CORINTO', 'EL REALEJO', 'EL VIEJO', 'POSOLTEGA', 'PUERTO MORAZAN', 'SAN FRANCISCO DEL NORTE', 'SAN PEDRO DEL NORTE', 'SANTO TOMAS DEL NORTE', 'SOMOTILLO', 'VILLANUEVA'],
    'CHONTALES': ['ACOYAPA', 'COMALAPA', 'SAN FRANCISCO DE CUAPA', 'EL CORAL', 'JUIGALPA', 'LA LIBERTAD', 'SAN PEDRO DE LOVAGO', 'SANTO DOMINGO', 'SANTO TOMAS', 'VILLA SANDINO'],
    'RACCN': ['WASLALA','BONANZA', 'MULUKUKU', 'PRINZAPOLKA', 'PUERTO CABEZAS', 'ROSITA', 'SIUNA', 'WASPAN'],
    'RACCS': ['EL RAMA', 'MUELLE DE LOS BUEYES', 'EL AYOTE', 'NUEVA GUINEA', 'BLUEFIELDS', 'CORN ISLAND', 'DESEMBOCADURA DE RIO GRANDE', 'EL TORTUGUERO', 'KUKRA HILL', 'LA CRUZ DE RIO GRANDE', 'LAGUNA DE PERLAS', 'BOCANA DE PAIWAS'],
    'ESTELI': ['CONDEGA', 'ESTELI', 'LA TRINIDAD', 'PUEBLO NUEVO', 'SAN JUAN DE LIMAY', 'SAN NICOLAS'],
    'GRANADA': ['DIRIA', 'DIRIOMO', 'GRANADA', 'NANDAIME'],
    'JINOTEGA': ['EL CUA', 'JINOTEGA', 'LA CONCORDIA', 'SAN JOSE DE BOCAY', 'SAN RAFAEL DEL NORTE', 'SAN SEBASTIAN DE YALI', 'SANTA MARIA DE PANTASMA', 'WIWILI-JINOTEGA'],
    'LEON': ['ACHUAPA', 'EL JICARAL', 'EL SAUCE', 'LA PAZ CENTRO', 'LARREYNAGA', 'LEON', 'NAGAROTE', 'QUEZALGUAQUE', 'SANTA ROSA DEL PEÑON', 'TELICA'],
    'MADRIZ': ['LAS SABANA', 'PALACAGÜINA', 'SAN JOSE DE CUSMAPA', 'SAN JUAN DE RIO COCO', 'SAN LUCAS', 'SOMOTO', 'TELPANECA', 'TOTOGALPA', 'YALAGÜINA'],
    'MANAGUA': ['CIUDAD SANDINO', 'EL CRUCERO', 'MANAGUA', 'MATEARE', 'SAN FRANCISCO LIBRE', 'SAN RAFAEL DEL SUR', 'TICUANTEPE', 'TIPITAPA', 'VILLA EL CARMEN'],
    'MASAYA': ['CATARINA', 'LA CONCEPCION', 'MASATEPE', 'MASAYA', 'NANDASMO', 'NINDIRI', 'NIQUINOHOMO', 'SAN JUAN DE ORIENTE', 'TISMA'],
    'MATAGALPA': [ 'CIUDAD DARIO', 'EL TUMA-LA DALIA', 'ESQUIPULAS', 'MATAGALPA', 'MATIGUAS', 'MUY MUY', 'RANCHO GRANDE', 'RIO BLANCO', 'SAN DIONISIO', 'SAN ISIDRO', 'SAN RAMÓN', 'SEBACO', 'TERRABONA'],
    'NUEVA SEGOVIA': ['CIUDAD ANTIGUA', 'DIPILTO', 'EL JICARO', 'JALAPA', 'MACUELIZO', 'MOZONTE', 'MURRA', 'OCOTAL', 'QUILALI', 'SAN FERNANDO', 'SANTA MARIA', 'WIWILI-NUEVA SEGOVIA'],
    'RIO SAN JUAN': ['EL ALMENDRO', 'EL CASTILLO', 'MORRITO', 'SAN CARLOS', 'SAN JUAN DE NICARAGUA', 'SAN MIGUELITO'],
    'RIVAS': ['ALTAGRACIA', 'BELEN', 'BUENOS AIRES', 'CARDENAS', 'MOYOGALPA', 'POTOSI', 'RIVAS', 'SAN JORGE', 'SAN JUAN DEL SUR', 'TOLA', ]
}

$(function () {
    $('#municipio').blur(function (e) {
        let selectValue = $('#municipio').val();
        let depart = 'no encontrado';
        let muni;
        let inputDepartament = $('#departamento')

        try {
            if (selectValue === '') {
                alertMessage('Error de seleccion', 'Seleccione un Municipio');
            } else {
                $.each(municipalIdCoding, function (departament) {
                    var muniIndex = municipalIdCoding[departament].indexOf(selectValue);
                    if (muniIndex !== -1) {
                        depart = departament;
                        muni = municipalIdCoding[departament][muniIndex];
                    }
                });
                if (depart !== 'no encontrado') {
                    inputDepartament.val(depart);
                } else {
                    alertMessage('Error', 'No se encontro lo escrito, porfavor verifique')
                };
            };
        } catch (error) {
            alertMessage('Error encontrado', error);
        }

    });
})