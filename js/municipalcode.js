let municipalIdCoding = {
    'BOACO': ['BOACO', 'CAMOAPA', 'SAN JOSE DE LOS REMATES', 'SAN LORENZO', 'SANTA LUCIA', 'TEUSTEPE'],
    'CARAZO': ['DIRIAMBA', 'DOLORES', 'EL ROSARIO', 'JINOTEPE', 'LA CONQUISTA', 'LA PAZ DE ORIENTE', 'SAN MARCOS', 'SANTA TERESA'],
    'CHINANDEGA': ['CHICHIGALPA', 'CHINANDEGA', 'CINCO PINOS', 'CORINTO', 'EL REALEJO', 'EL VIEJO', 'POSOLTEGA', 'PUERTO MORAZÁN', 'SAN FRANCISCO DEL NORTE', 'SAN PEDRO DEL NORTE', 'SANTO TOMÁS DEL NORTE', 'SOMOTILLO', 'VILLANUEVA'],
    'CHONTALES': ['ACOYAPA', 'COMALAPA', 'CUAPA', 'EL CORAL', 'JUIGALPA', 'LA LIBERTAD', 'SAN PEDRO DE LÓVAGO', 'SANTO DOMINGO', 'SANTO TOMÁS', 'VILLA SANDINO'],
    'RACCN': ['BONANZA', 'MULUKUKU', 'PRINZAPOLKA', 'PUERTO CABEZAS', 'ROSITA', 'SIUNA', 'WASLALA', 'WASPAN'],
    'RACCS': ['BLUEFIELDS', 'CORN ISLAND', 'DESEMBOCADURA DE RÍO GRANDE', 'EL AYOTE', 'EL RAMA', 'EL TORTUGUERO', 'KUKRA HILL', 'LA CRUZ DE RÍO GRANDE', 'LAGUNA DE PERLAS', 'MUELLE DE LOS BUEYES', 'NUEVA GUINEA', 'PAIWAS'],
    'ESTELI': ['CONDEGA', 'ESTELÍ', 'LA TRINIDAD', 'PUEBLO NUEVO', 'SAN JUAN DE LIMAY', 'SAN NICOLÁS'],
    'GRANADA': ['DIRIÁ', 'DIRIOMO', 'GRANADA', 'NANDAIME'],
    'JINOTEGA': ['EL CUÁ', 'JINOTEGA', 'LA CONCORDIA', 'SAN JOSÉ DE BOCAY', 'SAN RAFAEL DEL NORTE', 'SAN SEBASTIÁN DE YALI', 'SANTA MARIA DE PANTASMA', 'WIWILÍ DE JINOTEGA'],
    'LEON': ['ACHUAPA', 'EL JICARAL', 'EL SAUCE', 'LA PAZ CENTRO', 'LARREYNAGA', 'LEON', 'NAGAROTE', 'QUEZALGUAQUE', 'SANTA ROSA DEL PEÑÓN', 'TELICA'],
    'MADRIZ': ['LAS SABANAS', 'PALACAGÜINA', 'SAN JOSÉ DE CUSMAPA', 'SAN JUAN DE RÍO COCO', 'SAN LUCAS', 'SOMOTO', 'TELPANECA', 'TOTOGALPA', 'YALAGÜINA'],
    'MANAGUA': ['CIUDAD SANDINO', 'EL CRUCERO', 'MANAGUA', 'MATEARE', 'SAN FRANCISCO LIBRE', 'SAN RAFAEL DEL SUR', 'TICUANTEPE', 'TIPITAPA', 'VILLA EL CARMEN'],
    'MASAYA': ['CATARINA', 'LA CONCEPCIÓN', 'MASATEPE', 'MASAYA', 'NANDASMO', 'NINDIRÍ', 'NIQUINOHOMO', 'SAN JUAN DE ORIENTE', 'TISMA'],
    'MATAGALPA': ['CIUDAD DARÍO', 'EL TUMA - LA DALIA', 'ESQUIPULAS', 'MATAGALPA', 'MATIGUÁS', 'MUY MUY', 'RANCHO GRANDE', 'RÍO BLANCO', 'SAN DIONISIO', 'SAN ISIDRO', 'SAN RAMÓN', 'SÉBACO', 'TERRABONA'],
    'NUEVA SEGOVIA': ['CIUDAD ANTIGUA', 'DIPILTO', 'EL JÍCARO', 'JALAPA', 'MACUELIZO', 'MOZONTE', 'MURRA', 'OCOTAL', 'QUILALÍ', 'SAN FERNANDO', 'SANTA MARÍA', 'WIWILÍ'],
    'RIO SAN JUAN': ['EL ALMENDRO', 'EL CASTILLO', 'MORRITO', 'SAN CARLOS', 'SAN JUAN DEL NORTE', 'SAN MIGUELITO'],
    'RIVAS': ['ALTAGRACIA', 'BELÉN', 'BUENOS AIRES', 'CÁRDENAS', 'MOYOGALPA', 'POTOSÍ', 'RIVAS', 'SAN JORGE', 'SAN JUAN DEL SUR', 'TOLA', ]
}

$(function () {
    let select = $('select[name="selectMunicipio"]');
    let option = '<option value="">Seleccione Municipio</option>';
    var selectValue = '';

    $.each(municipalIdCoding, function (departamento, municipio) {
        $.each(municipio, function (k, m) {
            option += '<option value="' + m + '">' + m + '</option>';
        })
    });
    select.html(option);

    $('select[name="selectMunicipio"]').on('change', function (e) {
        selectValue = $(this).val();
        let depart;
        let muni;
        let inputDepartament = $('#departamento')

        if (selectValue === '') {
            alertMessage('Error de seleccion', 'Seleccione un Municipio');
        } else {
            $.each(municipalIdCoding, function (departament) {
                var muniIndex = municipalIdCoding[departament].indexOf(selectValue);
                if (muniIndex !== -1) {
                    depart = departament;
                    muni = municipalIdCoding[departament][muniIndex]
                };
            });
            inputDepartament.val(depart);
        };
    });
})