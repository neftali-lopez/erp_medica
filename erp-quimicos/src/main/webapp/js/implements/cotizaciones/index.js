$(function() {
        //var controller = "com.mycompany_Kemikal_war_1.0-SNAPSHOT/controllers/cotizaciones";
        
	String.prototype.toCharCode = function(){
	    var str = this.split(''), len = str.length, work = new Array(len);
	    for (var i = 0; i < len; ++i){
			work[i] = this.charCodeAt(i);
	    }
	    return work.join(',');
	};
	
	$('#header').find('#header1').find('span.emp').text($('#lienzo_recalculable').find('input[name=emp]').val());
	$('#header').find('#header1').find('span.suc').text($('#lienzo_recalculable').find('input[name=suc]').val());
    var $username = $('#header').find('#header1').find('span.username');
	$username.text($('#lienzo_recalculable').find('input[name=user]').val());
	
	var $contextpath = $('#lienzo_recalculable').find('input[name=contextpath]');
	var controller = $contextpath.val()+"/controllers/cotizaciones";
    
    //Barra para las acciones
    $('#barra_acciones').append($('#lienzo_recalculable').find('.table_acciones'));
    $('#barra_acciones').find('.table_acciones').css({'display':'block'});
    var $new_cotizacion = $('#barra_acciones').find('.table_acciones').find('a[href*=new_item]');
	var $visualiza_buscador = $('#barra_acciones').find('.table_acciones').find('a[href*=visualiza_buscador]');
	
	$('#barra_acciones').find('.table_acciones').find('#nItem').mouseover(function(){
		$(this).removeClass("onmouseOutNewItem").addClass("onmouseOverNewItem");
	});
	$('#barra_acciones').find('.table_acciones').find('#nItem').mouseout(function(){
		$(this).removeClass("onmouseOverNewItem").addClass("onmouseOutNewItem");
	});
	
	
	$('#barra_acciones').find('.table_acciones').find('#vbuscador').mouseover(function(){
		$(this).removeClass("onmouseOutVisualizaBuscador").addClass("onmouseOverVisualizaBuscador");
	});
	$('#barra_acciones').find('.table_acciones').find('#vbuscador').mouseout(function(){
		$(this).removeClass("onmouseOverVisualizaBuscador").addClass("onmouseOutVisualizaBuscador");
	});
		
	//aqui va el titulo del catalogo
	$('#barra_titulo').find('#td_titulo').append('Cotizaciones');
	
	//barra para el buscador 
	//$('#barra_buscador').css({'height':'0px'});
	$('#barra_buscador').append($('#lienzo_recalculable').find('.tabla_buscador'));	
	//$('#barra_buscador').find('.tabla_buscador').css({'display':'none'});
	//$('#barra_buscador').hide();
	
	var $cadena_busqueda = "";
	var $busqueda_folio = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_folio]');
	var $busqueda_cliente = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_cliente]');
	var $busqueda_fecha_inicial = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_fecha_inicial]');
	var $busqueda_fecha_final = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_fecha_final]');
	var $busqueda_select_tipo = $('#barra_buscador').find('.tabla_buscador').find('select[name=busqueda_select_tipo]');
	var $busqueda_codigo = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_codigo]');
	var $busqueda_producto = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_producto]');	
	var $busqueda_select_agente = $('#barra_buscador').find('.tabla_buscador').find('select[name=busqueda_select_agente]');
	
	var $buscar = $('#barra_buscador').find('.tabla_buscador').find('input[value$=Buscar]');
	var $limpiar = $('#barra_buscador').find('.tabla_buscador').find('input[value$=Limpiar]');
	//var almacenes = new Array(); //este arreglo carga el select de almacen, los select almacen destino del grid
	
	//con esta variable se verifica si el erp incluye modulo de CRM
	if($('#lienzo_recalculable').find('input[name=crm]').val()=='false'){
		$('#barra_buscador').find('.tabla_buscador').find('#td_tipo').hide();
		$busqueda_select_tipo.children().remove();
			var html='<option value="1" selected="yes">Cliente</option>';
		$busqueda_select_tipo.append(html);
		$('#barra_buscador').find('.tabla_buscador').find('#etiqueta_tipo').text("Cliente");
	}else{
		$('#barra_buscador').find('.tabla_buscador').find('#etiqueta_tipo').text("Cliente/Prospecto");	
	}
	
	
	//cambiar el tipo
	$busqueda_select_tipo.change(function(){
		if(parseInt($(this).val())==0){
			$('#barra_buscador').find('.tabla_buscador').find('#etiqueta_tipo').text("Cliente/Prospecto");
		}
		
		if(parseInt($(this).val())==1){
			$('#barra_buscador').find('.tabla_buscador').find('#etiqueta_tipo').text("Cliente");
		}
		
		if(parseInt($(this).val())==2){
			$('#barra_buscador').find('.tabla_buscador').find('#etiqueta_tipo').text("Prospecto");
		}
	});
	
	var to_make_one_search_string = function(){
		var valor_retorno = "";
		var signo_separador = "=";
		valor_retorno += "folio" + signo_separador + $busqueda_folio.val() + "|";
		valor_retorno += "cliente" + signo_separador + $busqueda_cliente.val() + "|";
		valor_retorno += "fecha_inicial" + signo_separador + $busqueda_fecha_inicial.val() + "|";
		valor_retorno += "fecha_final" + signo_separador + $busqueda_fecha_final.val()+ "|";
		valor_retorno += "tipo" + signo_separador + $busqueda_select_tipo.val()+ "|";
		valor_retorno += "incluye_crm" + signo_separador + $('#lienzo_recalculable').find('input[name=crm]').val() + "|";
		valor_retorno += "codigo" + signo_separador + $busqueda_codigo.val() + "|";
		valor_retorno += "producto" + signo_separador + $busqueda_producto.val() + "|";
		valor_retorno += "agente" + signo_separador + $busqueda_select_agente.val();
		
		return valor_retorno;
	};
        
	cadena = to_make_one_search_string();
	$cadena_busqueda = cadena.toCharCode();
	
	$buscar.click(function(event){
		event.preventDefault();
		cadena = to_make_one_search_string();
		$cadena_busqueda = cadena.toCharCode();
		$get_datos_grid();
	});
	
	//esta funcion carga los datos para el buscador del paginado
	$cargar_datos_buscador_principal= function(){
		var input_json_lineas = document.location.protocol + '//' + document.location.host + '/'+controller+'/getAgentesParaBuscador.json';
		$arreglo = {'iu':$('#lienzo_recalculable').find('input[name=iu]').val()}
		$.post(input_json_lineas,$arreglo,function(data){
			//Alimentando los campos select_agente
			$busqueda_select_agente.children().remove();
			var agente_hmtl = '';
			if(parseInt(data['Extra'][0]['exis_rol_admin']) > 0){
				agente_hmtl += '<option value="0" >[-- Selecionar Agente --]</option>';
			}
			
			$.each(data['Agentes'],function(entryIndex,agente){
				if(parseInt(agente['id'])==parseInt(data['Extra'][0]['id_agente'])){
					agente_hmtl += '<option value="' + agente['id'] + '" selected="yes">' + agente['nombre_agente'] + '</option>';
				}else{
					//si exis_rol_admin es mayor que cero, quiere decir que el usuario logueado es un administrador,
					//por lo tanto hay que cargar todos los agentes en el select del buscador
					if(parseInt(data['Extra'][0]['exis_rol_admin']) > 0){
						agente_hmtl += '<option value="' + agente['id'] + '" >' + agente['nombre_agente'] + '</option>';
					}
				}
			});
			$busqueda_select_agente.append(agente_hmtl);
		});
	}
	
	
	$limpiar.click(function(event){
		$cargar_datos_buscador_principal();
		
		$busqueda_folio.val('');
		$busqueda_cliente.val('');
		$busqueda_fecha_inicial.val('');
		$busqueda_fecha_final.val('');
		$busqueda_codigo.val('');
		$busqueda_producto.val('');
		$busqueda_select_tipo.children().remove();
		var html2="";
		//con esta variable se verifica si el erp incluye modulo de CRM
		if($('#lienzo_recalculable').find('input[name=crm]').val()=='false'){
			html2='<option value="1" selected="yes">Cliente</option>';
		}else{
			html2 ='<option value="0" selected="yes">[-Todos-]</option>';
			html2+='<option value="1">Cliente</option>';
			html2 +='<option value="2">Prospecto</option>';
		}
		$busqueda_select_tipo.append(html2);
		$get_datos_grid();
		
		$busqueda_folio.focus();
	});
	
	
	TriggerClickVisializaBuscador = 0;
	//visualizar  la barra del buscador
	$visualiza_buscador.click(function(event){
		event.preventDefault();
		var alto=0;
		if(TriggerClickVisializaBuscador==0){
			 TriggerClickVisializaBuscador=1;
			 var height2 = $('#cuerpo').css('height');
			 //alert('height2: '+height2);
			 
			 alto = parseInt(height2)-220;
			 var pix_alto=alto+'px';
			 //alert('pix_alto: '+pix_alto);
			 
			 $('#barra_buscador').find('.tabla_buscador').css({'display':'block'});
			 $('#barra_buscador').animate({height: '80px'}, 500);
			 $('#cuerpo').css({'height': pix_alto});
			 
			 //alert($('#cuerpo').css('height'));
		}else{
			 TriggerClickVisializaBuscador=0;
			 var height2 = $('#cuerpo').css('height');
			 alto = parseInt(height2)+220;
			 var pix_alto=alto+'px';
			 
			 $('#barra_buscador').animate({height:'0px'}, 500);
			 $('#cuerpo').css({'height': pix_alto});
		};
		$busqueda_folio.focus();
	});
	
	//llamamos a la fucnion que carga datos para el buscador principal
	$cargar_datos_buscador_principal();
	
	
	//aplicar evento keypress a campos para ejecutar la busqueda
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_folio, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_cliente, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_codigo, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_producto, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_fecha_inicial, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_fecha_final, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_select_tipo, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_select_agente, $buscar);
	
	
	
	//----------------------------------------------------------------
	//valida la fecha seleccionada
	function mayor(fecha, fecha2){
		var xMes=fecha.substring(5, 7);
		var xDia=fecha.substring(8, 10);
		var xAnio=fecha.substring(0,4);
		var yMes=fecha2.substring(5, 7);
		var yDia=fecha2.substring(8, 10);
		var yAnio=fecha2.substring(0,4);
		
		if (xAnio > yAnio){
			return(true);
		}else{
			if (xAnio == yAnio){
				if (xMes > yMes){
					return(true);
				}
				if (xMes == yMes){
					if (xDia >= yDia){
						return(true);
					}else{
						return(false);
					}
				}else{
					return(false);
				}
			}else{
				return(false);
			}
		}
	}
	//muestra la fecha actual
	var mostrarFecha = function mostrarFecha(){
		var ahora = new Date();
		var anoActual = ahora.getFullYear();
		var mesActual = ahora.getMonth();
		mesActual = mesActual+1;
		mesActual = (mesActual <= 9)?"0" + mesActual : mesActual;
		var diaActual = ahora.getDate();
		diaActual = (diaActual <= 9)?"0" + diaActual : diaActual;
		var Fecha = anoActual + "-" + mesActual + "-" + diaActual;		
		return Fecha;
	}
	//----------------------------------------------------------------
        
        
	$busqueda_fecha_inicial.click(function (s){
		var a=$('div.datepicker');
		a.css({'z-index':100});
	});
        
	$busqueda_fecha_inicial.DatePicker({
		format:'Y-m-d',
		date: $(this).val(),
		current: $(this).val(),
		starts: 1,
		position: 'bottom',
		locale: {
			days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
			daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
			daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
			months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
			monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
			weekMin: 'se'
		},
		onChange: function(formated, dates){
			var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
			$busqueda_fecha_inicial.val(formated);
			if (formated.match(patron) ){
				var valida_fecha=mayor($busqueda_fecha_inicial.val(),mostrarFecha());
				
				if (valida_fecha==true){
					jAlert("Fecha no valida",'! Atencion');
					$busqueda_fecha_inicial.val(mostrarFecha());
				}else{
					$busqueda_fecha_inicial.DatePickerHide();	
				}
			}
		}
	});
        
	$busqueda_fecha_final.click(function (s){
		var a=$('div.datepicker');
		a.css({'z-index':100});
	});
	
	$busqueda_fecha_final.DatePicker({
		format:'Y-m-d',
		date: $(this).val(),
		current: $(this).val(),
		starts: 1,
		position: 'bottom',
		locale: {
			days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
			daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
			daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
			months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
			monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
			weekMin: 'se'
		},
		onChange: function(formated, dates){
			var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
			$busqueda_fecha_final.val(formated);
			if (formated.match(patron) ){
				var valida_fecha=mayor($busqueda_fecha_final.val(),mostrarFecha());
				
				if (valida_fecha==true){
					jAlert("Fecha no valida",'! Atencion');
					$busqueda_fecha_final.val(mostrarFecha());
				}else{
					$busqueda_fecha_final.DatePickerHide();	
				}
			}
		}
	});
	
	
	
	
    //datos para el buscador
    //$arreglo = {}
    //var json_string = document.location.protocol + '//' + document.location.host + '/' + controller + '/data_buscador/out.json';
    //alimenta campos buscador
    
	
	
	$tabs_li_funxionalidad = function(){
		var $select_prod_tipo = $('#forma-cotizacions-window').find('select[name=prodtipo]');
		$('#forma-cotizacions-window').find('#submit').mouseover(function(){
			$('#forma-cotizacions-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/bt1.png");
		});
		$('#forma-cotizacions-window').find('#submit').mouseout(function(){
			$('#forma-cotizacions-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/btn1.png");
		});
		
		$('#forma-cotizacions-window').find('#boton_cancelar').mouseover(function(){
			$('#forma-cotizacions-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/bt2.png)"});
		});
		$('#forma-cotizacions-window').find('#boton_cancelar').mouseout(function(){
			$('#forma-cotizacions-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/btn2.png)"});
		});
		
		$('#forma-cotizacions-window').find('#close').mouseover(function(){
			$('#forma-cotizacions-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close_over.png)"});
		});
		$('#forma-cotizacions-window').find('#close').mouseout(function(){
			$('#forma-cotizacions-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close.png)"});
		});

		$('#forma-cotizacions-window').find(".contenidoPes").hide(); //Hide all content
		$('#forma-cotizacions-window').find("ul.pestanas li:first").addClass("active").show(); //Activate first tab
		$('#forma-cotizacions-window').find(".contenidoPes:first").show(); //Show first tab content

		//On Click Event
		$('#forma-cotizacions-window').find("ul.pestanas li").click(function() {
			$('#forma-cotizacions-window').find(".contenidoPes").hide();
			$('#forma-cotizacions-window').find("ul.pestanas li").removeClass("active");
			var activeTab = $(this).find("a").attr("href");
			$('#forma-cotizacions-window').find( activeTab , "ul.pestanas li" ).fadeIn().show();
			$(this).addClass("active");
			return false;
		});
	}
	
	
	var quitar_comas= function($valor){
		$valor = $valor+'';
		return $valor.split(',').join('');
	}
	
	
	
	
	$agregarDatosClienteSeleccionado = function(array_monedas, array_agentes, num_lista_precio, id_cliente, numero_control, rfc_cliente, razon_social_cliente, dir_cliente, contacto_cliente, id_moneda_cliente, id_agente){
		//asignar a los campos correspondientes el sku y y descripcion
		$('#forma-cotizacions-window').find('input[name=id_cliente]').val(id_cliente);
		$('#forma-cotizacions-window').find('input[name=nocontrolcliente]').val(numero_control);
		$('#forma-cotizacions-window').find('input[name=rfccliente]').val(rfc_cliente);
		$('#forma-cotizacions-window').find('input[name=razoncliente]').val(razon_social_cliente);
		$('#forma-cotizacions-window').find('input[name=dircliente]').val(dir_cliente);
		$('#forma-cotizacions-window').find('input[name=contactocliente]').val(contacto_cliente);
		$('#forma-cotizacions-window').find('input[name=num_lista_precio]').val(num_lista_precio);
		
		var id_moneda = id_moneda_cliente;
		
		var moneda_hmtl = '';
		if(parseInt(num_lista_precio)>0){
			//aquí se arma la cadena json para traer la moneda de la lista de precio
			var input_json2 = document.location.protocol + '//' + document.location.host + '/'+controller+'/getMonedaLista.json';
			$arreglo2 = { 'lista_precio':num_lista_precio }
			$.post(input_json2,$arreglo2,function(moneda_lista){
				$.each(moneda_lista['listaprecio'],function(entryIndex ,monedalista){
					id_moneda = monedalista['moneda_id'];
					
					//carga el select de monedas  con la moneda del cliente seleccionada por default
					$('#forma-cotizacions-window').find('select[name=moneda]').children().remove();
					$('#forma-cotizacions-window').find('select[name=moneda2]').children().remove();
					$.each(array_monedas ,function(entryIndex,moneda){
						if( parseInt(moneda['id']) == parseInt(id_moneda) ){
							moneda_hmtl += '<option value="' + moneda['id'] + '" selected="yes">' + moneda['descripcion'] + '</option>';
						}else{
							//permitir que se muestren todas las monedas
							//if(parseInt(id_moneda)==0){
								moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
							//}
						}
					});
					$('#forma-cotizacions-window').find('select[name=moneda]').append(moneda_hmtl);
					//esta es la moneda original, no cambia al cambiar la moneda de la vista
					$('#forma-cotizacions-window').find('select[name=moneda2]').append(moneda_hmtl);
					
					
					var cambiarTcOriginal='true';
					//ejecutar funcion que obtiene el tipo de cambio de acuerdo a la moneda seleccionada
					getTcIdMoneda(id_moneda, cambiarTcOriginal);
				});
			});
		}else{
			//carga el select de monedas  con la moneda del cliente seleccionada por default
			$('#forma-cotizacions-window').find('select[name=moneda]').children().remove();
			$('#forma-cotizacions-window').find('select[name=moneda2]').children().remove();
			$.each(array_monedas ,function(entryIndex,moneda){
				if( parseInt(moneda['id']) == parseInt(id_moneda) ){
					moneda_hmtl += '<option value="' + moneda['id'] + '" selected="yes">' + moneda['descripcion'] + '</option>';
				}else{
					//permitir que se muestren todas las monedas
					//if(parseInt(id_moneda)==0){
						moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
					//}
				}
			});
			$('#forma-cotizacions-window').find('select[name=moneda]').append(moneda_hmtl);
			
			//esta es la moneda original, no cambia al cambiar la moneda de la vista
			$('#forma-cotizacions-window').find('select[name=moneda2]').append(moneda_hmtl);
			
			var cambiarTcOriginal='true';
			//ejecutar funcion que obtiene el tipo de cambio de acuerdo a la moneda seleccionada
			getTcIdMoneda(id_moneda, cambiarTcOriginal);
		}

		
		
		//carga select de agentes dejando seleccionado por default el agente asignado al cliente
		$('#forma-cotizacions-window').find('select[name=select_agente]').children().remove();
		var agen_hmtl = '';
		$.each(array_agentes,function(entryIndex,agen){
			if(parseInt(agen['id']) == parseInt(id_agente)){
				agen_hmtl += '<option value="' + agen['id'] + '" selected="yes">' + agen['nombre_agente'] + '</option>';
			}else{
				agen_hmtl += '<option value="' + agen['id'] + '"  >' + agen['nombre_agente'] + '</option>';
			}
		});
		$('#forma-cotizacions-window').find('select[name=select_agente]').append(agen_hmtl);
		
	}
	
	
	
	
	
	//buscador de clientes
	$busca_clientes = function(tipo, no_control, cliente, array_monedas, array_agentes){
		//limpiar_campos_grids();
		$(this).modalPanel_Buscacliente();
		var $dialogoc =  $('#forma-buscacliente-window');
		//var $dialogoc.prependTo('#forma-buscaproduct-window');
		$dialogoc.append($('div.buscador_clientes').find('table.formaBusqueda_clientes').clone());
		$('#forma-buscacliente-window').css({"margin-left": -200, 	"margin-top": -200});
		
		var $tabla_resultados = $('#forma-buscacliente-window').find('#tabla_resultado');
		
		//var $busca_cliente_modalbox = $('#forma-buscacliente-window').find('a[href*=busca_cliente_modalbox]');
		//var $cancelar_plugin_busca_cliente = $('#forma-buscacliente-window').find('a[href*=cencela]');
		var $busca_cliente_modalbox = $('#forma-buscacliente-window').find('#busca_cliente_modalbox');
		var $cancelar_plugin_busca_cliente = $('#forma-buscacliente-window').find('#cencela');
		
		var $cadena_buscar = $('#forma-buscacliente-window').find('input[name=cadena_buscar]');
		var $select_filtro_por = $('#forma-buscacliente-window').find('select[name=filtropor]');
		
		//funcionalidad botones
		$busca_cliente_modalbox.mouseover(function(){
			$(this).removeClass("onmouseOutBuscar").addClass("onmouseOverBuscar");
		});
		$busca_cliente_modalbox.mouseout(function(){
			$(this).removeClass("onmouseOverBuscar").addClass("onmouseOutBuscar");
		});
		
		$cancelar_plugin_busca_cliente.mouseover(function(){
			$(this).removeClass("onmouseOutCancelar").addClass("onmouseOverCancelar");
		});
		$cancelar_plugin_busca_cliente.mouseout(function(){
			$(this).removeClass("onmouseOverCancelar").addClass("onmouseOutCancelar");
		});
		
		if(parseInt(tipo)==1){
			$('#forma-buscacliente-window').find('div.titulo_clientes').find('strong').text("Buscador de Clientes");
		}else{
			$('#forma-buscacliente-window').find('div.titulo_clientes').find('strong').text("Buscador de Prospectos");
		}
		
		var html = '';
		$select_filtro_por.children().remove();
		html='<option value="0">[-- Opcion busqueda --]</option>';
		
		if(no_control!=''){
			html+='<option value="1" selected="yes">No. de control</option>';
			$cadena_buscar.val(no_control);
		}else{
			html+='<option value="1">No. de control</option>';
		}
		html+='<option value="2">RFC</option>';
		if(cliente!=''){
			html+='<option value="3" selected="yes">Razon social</option>';
			$cadena_buscar.val(cliente);
		}else{
			if(no_control=='' && cliente==''){
				html+='<option value="3" selected="yes">Razon social</option>';
			}else{
				html+='<option value="3">Razon social</option>';
			}
		}
		
		if(parseInt(tipo)==1){
			//estos dos filtros solo son para clientes, no para prospectos
			html+='<option value="4">CURP</option>';
			html+='<option value="5">Alias</option>';
		}
		$select_filtro_por.append(html);
		
		
		$cadena_buscar.focus();
		
		//click buscar clientes
		$busca_cliente_modalbox.click(function(event){
			//event.preventDefault();
			var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getBuscadorClienteProspecto.json';
			$arreglo = {
						'tipo':tipo,
						'cadena':$cadena_buscar.val(),
						'filtro':$select_filtro_por.val(),
						'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
						}
			var trr = '';
			$tabla_resultados.children().remove();
			$.post(input_json,$arreglo,function(entry){
				$.each(entry['Resultado'],function(entryIndex,cliente){
					
					trr = '<tr>';
						trr += '<td width="80">';
							trr += '<input type="hidden" id="idclient" value="'+cliente['id']+'">';
							trr += '<input type="hidden" id="direccion" value="'+cliente['direccion']+'">';
							trr += '<input type="hidden" id="id_moneda" value="'+cliente['moneda_id']+'">';
							trr += '<input type="hidden" id="moneda" value="'+cliente['moneda']+'">';
							trr += '<input type="hidden" id="contacto" value="'+cliente['contacto']+'">';
							trr += '<span class="no_control">'+cliente['numero_control']+'</span>';
							trr += '<input type="hidden" id="id_agente" value="'+cliente['cxc_agen_id']+'">';
							trr += '<input type="hidden" id="lista_precio" value="'+cliente['lista_precio']+'">';
						trr += '</td>';
						trr += '<td width="145"><span class="rfc">'+cliente['rfc']+'</span></td>';
						trr += '<td width="375"><span class="razon">'+cliente['razon_social']+'</span></td>';
					trr += '</tr>';
					
					$tabla_resultados.append(trr);
				});
				
				$tabla_resultados.find('tr:odd').find('td').css({'background-color' : '#e7e8ea'});
				$tabla_resultados.find('tr:even').find('td').css({'background-color' : '#FFFFFF'});
				
				$('tr:odd' , $tabla_resultados).hover(function () {
					$(this).find('td').css({background : '#FBD850'});
				}, function() {
						//$(this).find('td').css({'background-color':'#DDECFF'});
					$(this).find('td').css({'background-color':'#e7e8ea'});
				});
				$('tr:even' , $tabla_resultados).hover(function () {
					$(this).find('td').css({'background-color':'#FBD850'});
				}, function() {
					$(this).find('td').css({'background-color':'#FFFFFF'});
				});
				
				//seleccionar un producto del grid de resultados
				$tabla_resultados.find('tr').click(function(){
					var num_lista_precio=$(this).find('#lista_precio').val();
					var id_cliente = $(this).find('#idclient').val();
					var numero_control = $(this).find('span.no_control').html();
					var rfc_cliente = $(this).find('span.rfc').html();
					var razon_social_cliente = $(this).find('span.razon').html();
					var dir_cliente = $(this).find('#direccion').val();
					var contacto_cliente = $(this).find('#contacto').val();
					var id_moneda_cliente = $(this).find('#id_moneda').val();
					var id_agente = $(this).find('#id_agente').val();
					
					$agregarDatosClienteSeleccionado(array_monedas, array_agentes, num_lista_precio, id_cliente, numero_control, rfc_cliente, razon_social_cliente, dir_cliente, contacto_cliente, id_moneda_cliente, id_agente);
					
					//elimina la ventana de busqueda
					var remove = function() {$(this).remove();};
					$('#forma-buscacliente-overlay').fadeOut(remove);
					//asignar el enfoque al campo sku del producto
					$('#forma-cotizacions-window').find('input[name=sku_producto]').focus();
				});
				
			});
		});//termina llamada json
		
		//si hay algo en el campo cadena_buscar al cargar el buscador, ejecuta la busqueda
		if($cadena_buscar.val() != ''){
			$busca_cliente_modalbox.trigger('click');
		}
		
		$(this).aplicarEventoKeypressEjecutaTrigger($cadena_buscar, $busca_cliente_modalbox);
		$(this).aplicarEventoKeypressEjecutaTrigger($select_filtro_por, $busca_cliente_modalbox);
		
		$cancelar_plugin_busca_cliente.click(function(event){
			//event.preventDefault();
			var remove = function() {$(this).remove();};
			$('#forma-buscacliente-overlay').fadeOut(remove);
			$('#forma-cotizacions-window').find('input[name=nocontrolcliente]').focus();
		});
	}//termina buscador de clientes
	
	
	
	
	
	//buscador de productos
	$busca_productos = function(sku_buscar, descripcion){
		//limpiar_campos_grids();
		$(this).modalPanel_Buscaproducto();
		var $dialogoc =  $('#forma-buscaproducto-window');
		//var $dialogoc.prependTo('#forma-buscaproduct-window');
		$dialogoc.append($('div.buscador_productos').find('table.formaBusqueda_productos').clone());
		
		$('#forma-buscaproducto-window').css({"margin-left": -200, 	"margin-top": -200});
		
		var $tabla_resultados = $('#forma-buscaproducto-window').find('#tabla_resultado');
		
		var $campo_sku = $('#forma-buscaproducto-window').find('input[name=campo_sku]');
		var $select_tipo_producto = $('#forma-buscaproducto-window').find('select[name=tipo_producto]');
		var $campo_descripcion = $('#forma-buscaproducto-window').find('input[name=campo_descripcion]');
		
		//var $buscar_plugin_producto = $('#forma-buscaproducto-window').find('a[href*=busca_producto_modalbox]');
		//var $cancelar_plugin_busca_producto = $('#forma-buscaproducto-window').find('a[href*=cencela]');
		var $buscar_plugin_producto = $('#forma-buscaproducto-window').find('#busca_producto_modalbox');
		var $cancelar_plugin_busca_producto = $('#forma-buscaproducto-window').find('#cencela');
			
		//funcionalidad botones
		$buscar_plugin_producto.mouseover(function(){
			$(this).removeClass("onmouseOutBuscar").addClass("onmouseOverBuscar");
		});
		$buscar_plugin_producto.mouseout(function(){
			$(this).removeClass("onmouseOverBuscar").addClass("onmouseOutBuscar");
		});
		
		$cancelar_plugin_busca_producto.mouseover(function(){
			$(this).removeClass("onmouseOutCancelar").addClass("onmouseOverCancelar");
		});
		
		$cancelar_plugin_busca_producto.mouseout(function(){
			$(this).removeClass("onmouseOverCancelar").addClass("onmouseOutCancelar");
		});
		
		
		//buscar todos los tipos de productos
		var input_json_tipos = document.location.protocol + '//' + document.location.host + '/'+controller+'/getProductoTipos.json';
		$arreglo = {'iu':$('#lienzo_recalculable').find('input[name=iu]').val()}
		$.post(input_json_tipos,$arreglo,function(data){
			//Llena el select tipos de productos en el buscador
			$select_tipo_producto.children().remove();
			var prod_tipos_html = '<option value="0">[--Seleccionar Tipo--]</option>';
			$.each(data['prodTipos'],function(entryIndex,pt){
				if(parseInt(pt['id'])==1){
					prod_tipos_html += '<option value="' + pt['id'] + '" selected="yes">' + pt['titulo'] + '</option>';
				}else{
					prod_tipos_html += '<option value="' + pt['id'] + '" >' + pt['titulo'] + '</option>';
				}
			});
			$select_tipo_producto.append(prod_tipos_html);
		});
		
		
		//Aqui asigno al campo sku del buscador si el usuario ingresó un sku antes de hacer clic en buscar en la ventana principal
		$campo_sku.val(sku_buscar);
		
		$campo_descripcion.val(descripcion);
		
		$campo_sku.focus();//asignar enfoque al cargar plugin
		
		//click buscar productos
		$buscar_plugin_producto.click(function(event){
			//event.preventDefault();
			var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/get_buscador_productos.json';
			$arreglo = {	'sku':$campo_sku.val(),
							'tipo':$select_tipo_producto.val(),
							'descripcion':$campo_descripcion.val(),
							'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
						}
			var trr = '';
			$tabla_resultados.children().remove();
			$.post(input_json,$arreglo,function(entry){
				$.each(entry['productos'],function(entryIndex,producto){
					trr = '<tr>';
						trr += '<td width="120">';
							trr += '<input type="hidden" id="id_prod_buscador" value="'+producto['id']+'">';
							trr += '<span class="sku_prod_buscador">'+producto['sku']+'</span>';
						trr += '</td>';
						trr += '<td width="280"><span class="titulo_prod_buscador">'+producto['descripcion']+'</span></td>';
						trr += '<td width="90">';
							trr += '<span class="unidad_id" style="display:none;">'+producto['unidad_id']+'</span>';
							trr += '<span class="utitulo">'+producto['unidad']+'</span>';
						trr += '</td>';
						trr += '<td width="90"><span class="tipo_prod_buscador">'+producto['tipo']+'</span></td>';
					trr += '</tr>';
					
					$tabla_resultados.append(trr);
				});
				$tabla_resultados.find('tr:odd').find('td').css({'background-color' : '#e7e8ea'});
				$tabla_resultados.find('tr:even').find('td').css({'background-color' : '#FFFFFF'});
				
				$('tr:odd' , $tabla_resultados).hover(function () {
					$(this).find('td').css({background : '#FBD850'});
				}, function() {
					//$(this).find('td').css({'background-color':'#DDECFF'});
					$(this).find('td').css({'background-color':'#e7e8ea'});
				});
				$('tr:even' , $tabla_resultados).hover(function () {
					$(this).find('td').css({'background-color':'#FBD850'});
				}, function() {
					$(this).find('td').css({'background-color':'#FFFFFF'});
				});
				
				//seleccionar un producto del grid de resultados
				$tabla_resultados.find('tr').click(function(){
					//asignar a los campos correspondientes el sku y y descripcion
					$('#forma-cotizacions-window').find('input[name=sku_producto]').val($(this).find('span.sku_prod_buscador').html());
					$('#forma-cotizacions-window').find('input[name=nombre_producto]').val($(this).find('span.titulo_prod_buscador').html());
					//elimina la ventana de busqueda
					var remove = function() {$(this).remove();};
					$('#forma-buscaproducto-overlay').fadeOut(remove);
					//asignar el enfoque al campo sku del producto
					$('#forma-cotizacions-window').find('input[name=sku_producto]').focus();
				});
				
			});//termina llamada json
		});
		
		//si hay algo en el campo sku al cargar el buscador, ejecuta la busqueda
		if($campo_sku.val() != ''){
			$buscar_plugin_producto.trigger('click');
		}
		
		$cancelar_plugin_busca_producto.click(function(event){
			//event.preventDefault();
			var remove = function() {$(this).remove();};
			$('#forma-buscaproducto-overlay').fadeOut(remove);
			$('#forma-cotizacions-window').find('input[name=sku_producto]').focus();
		});
	}//termina buscador de productos
	
	
	
	
	
	//buscador de presentaciones disponibles para un producto
	$buscador_presentaciones_producto = function(rfc_cliente, sku_producto,$nombre_producto,$grid_productos, arrayMonedas){
		var $cliente_listaprecio=  $('#forma-cotizacions-window').find('input[name=num_lista_precio]');
		var $select_tipo_cotizacion=  $('#forma-cotizacions-window').find('select[name=select_tipo_cotizacion]');
		
		//verifica si el campo rfc proveedor no esta vacio
		if(rfc_cliente != ''){
			//verifica si el campo sku no esta vacio para realizar busqueda
			if(sku_producto != ''){
				var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getPresentacionesProducto.json';
				$arreglo = {
					'sku':sku_producto,
					'lista_precio':$cliente_listaprecio.val(),
					'tipo':$select_tipo_cotizacion.val(),
					'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
				};
				
				var trr = '';
				
				$.post(input_json,$arreglo,function(entry){
					
					//verifica si el arreglo  retorno datos
					if (entry['Presentaciones'].length > 0){
						
						if (entry['Presentaciones'][0]['exis_prod_lp']=='1'){
							
							$(this).modalPanel_Buscapresentacion();
							var $dialogoc =  $('#forma-buscapresentacion-window');
							$dialogoc.append($('div.buscador_presentaciones').find('table.formaBusqueda_presentaciones').clone());
							$('#forma-buscapresentacion-window').css({"margin-left": -200, "margin-top": -200});
							
							var $tabla_resultados = $('#forma-buscapresentacion-window').find('#tabla_resultado');
							var $cancelar_plugin_busca_lotes_producto = $('#forma-buscapresentacion-window').find('a[href*=cencela]');
							$tabla_resultados.children().remove();
							
							//crea el tr con los datos del producto seleccionado
							$.each(entry['Presentaciones'],function(entryIndex,pres){
								trr = '<tr>';
									trr += '<td width="100">';
										trr += '<span class="id_prod" style="display:none">'+pres['id']+'</span>';
										trr += '<span class="sku">'+pres['sku']+'</span>';
									trr += '</td>';
									trr += '<td width="250"><span class="titulo">'+pres['titulo']+'</span></td>';
									trr += '<td width="80">';
										trr += '<span class="unidad" style="display:none">'+pres['unidad']+'</span>';
										trr += '<span class="id_pres" style="display:none">'+pres['id_presentacion']+'</span>';
										trr += '<span class="pres">'+pres['presentacion']+'</span>';
										trr += '<span class="precio" style="display:none">'+pres['precio']+'</span>';
										trr += '<span class="img" style="display:none">'+pres['archivo_img']+'</span>';
										trr += '<span class="desclarga" style="display:none">'+pres['descripcion_larga']+'</span>';
									trr += '</td>';
								trr += '</tr>';
								$tabla_resultados.append(trr);
							});//termina llamada json

							$tabla_resultados.find('tr:odd').find('td').css({'background-color' : '#e7e8ea'});
							$tabla_resultados.find('tr:even').find('td').css({'background-color' : '#FFFFFF'});

							$('tr:odd' , $tabla_resultados).hover(function () {
								$(this).find('td').css({background : '#FBD850'});
							}, function() {
									//$(this).find('td').css({'background-color':'#DDECFF'});
								$(this).find('td').css({'background-color':'#e7e8ea'});
							});
							$('tr:even' , $tabla_resultados).hover(function () {
								$(this).find('td').css({'background-color':'#FBD850'});
							}, function() {
								$(this).find('td').css({'background-color':'#FFFFFF'});
							});
							
							//seleccionar un producto del grid de resultados
							$tabla_resultados.find('tr').click(function(){
								var id_detalle=0;
								var id_prod = $(this).find('span.id_prod').html();
								var sku = $(this).find('span.sku').html();
								var titulo = $(this).find('span.titulo').html();
								var imagen =$(this).find('span.img').html();
								var descripcion =$(this).find('span.desclarga').html();
								var unidad = $(this).find('span.unidad').html();
								var id_pres = $(this).find('span.id_pres').html();
								var pres = $(this).find('span.pres').html();
								var precio = $(this).find('span.precio').html();
								var cantidad = 0;
								var importe = 0;
								var mon_id = $('#forma-cotizacions-window').find('select[name=moneda]').val();
								//pasamos ceros porque es nuevo
								var idImp=0;
								var valorImp=0;
								
								//aqui se pasan datos a la funcion que agrega el tr en el grid
								$agrega_producto_grid($grid_productos, id_detalle, id_prod, sku, titulo, imagen, descripcion, unidad, id_pres, pres, precio, cantidad, importe, mon_id, arrayMonedas, idImp, valorImp);
								
								//elimina la ventana de busqueda
								var remove = function() {$(this).remove();};
								$('#forma-buscapresentacion-overlay').fadeOut(remove);
							});
							
							$cancelar_plugin_busca_lotes_producto.click(function(event){
								event.preventDefault();
								var remove = function() {$(this).remove();};
								$('#forma-buscapresentacion-overlay').fadeOut(remove);
								
								//regresa el enfoque al campo sku para permitir ingresar uno nuevo
								$('#forma-cotizacions-window').find('input[name=sku_producto]').focus();
							});
							
						}else{
							jAlert(entry['Presentaciones'][0]['exis_prod_lp'], 'Atencion!', function(r) { 
								$('#forma-cotizacions-window').find('input[name=sku_producto]').focus();
							});
						}
						
					}else{
						jAlert('El producto que intenta agregar no existe, pruebe ingresando otro.\nHaga clic en Buscar.', 'Atencion!', function(r) { 
							$('#forma-cotizacions-window').find('input[name=titulo_producto]').val('');
							$('#forma-cotizacions-window').find('input[name=titulo_producto]').focus();
						});
					}
				},"json");
				
			}else{
				jAlert('Es necesario ingresar un Sku de producto valido.', 'Atencion!', function(r) { 
					$('#forma-cotizacions-window').find('input[name=sku_producto]').focus();
				});
			}
		}else{
			jAlert('Es necesario seleccionar un Cliente.', 'Atencion!', function(r) { 
				$('#forma-cotizacions-window').find('input[name=nocontrolcliente]').focus();
			});
		}
		
	}//termina buscador dpresentaciones disponibles de un producto
	
        
       
	
	
	
	
	
	//agregar producto al grid
	$agrega_producto_grid = function($grid_productos, id_detalle, id_prod, sku, titulo, imagen, descripcion, unidad, id_pres, pres, precio, cantidad, importe, mon_id, arrayMonedas, idImp, valorImp){
		var $id_impuesto = $('#forma-cotizacions-window').find('input[name=id_impuesto]');
		var $valor_impuesto = $('#forma-cotizacions-window').find('input[name=valorimpuesto]');
		var $check_descripcion_larga =$('#forma-cotizacions-window').find('input[name=check_descripcion_larga]');
		var $precio_ingresado = $('#forma-cotizacions-window').find('input[name=precio_ingresado]');
		
		var $select_moneda = $('#forma-cotizacions-window').find('select[name=moneda]');
		var $moneda_original = $('#forma-cotizacions-window').find('select[name=moneda2]');
		var $num_lista_precio = $('#forma-cotizacions-window').find('input[name=num_lista_precio]');
		var $tc = $('#forma-cotizacions-window').find('input[name=tc]');
		var $tc_original = $('#forma-cotizacions-window').find('input[name=tc_original]');
		
		var precioOriginal = precio;
		var precioCambiado = 0.00;
		var importeImpuesto=0.00;
		
		//alert("orig:"+$moneda_original.val() + "		selec:"+mon_id);
		if(parseInt($num_lista_precio.val())>0){
			//si la moneda inicial de la cotizacion es diferente a la moneda actual seleccionada
			//entonces recalculamos los precios de acuerdo al tipo de cambio
			if( parseInt($moneda_original.val()) != parseInt(mon_id) ){
				
				if(parseInt($moneda_original.val())==1 && parseInt(mon_id)!=1){
					//si la moneda original es pesos, calculamos su equivalente a dolares
					precioCambiado = parseFloat( parseFloat(precioOriginal) / parseFloat($tc.val())).toFixed(4);
				}
				
				if(parseInt($moneda_original.val())!=1 && parseInt(mon_id)==1){
					//alert("precioOriginal:"+precioOriginal +"		tc_original:"+$tc_original.val());
					//si la moneda original es dolar y la moneda del precio es Pesos, calculamos su equivalente a dolar
					precioCambiado = parseFloat( parseFloat(precioOriginal) * parseFloat($tc_original.val()) ).toFixed(4);
				}
				
			}else{
				precioCambiado = precio;
			}
		}else{
			precioCambiado = precio;
		}
		
		//agregar comas
		precioCambiado = $(this).agregar_comas(precioCambiado);
		
		//si  el campo tipo de cambio es null o vacio, se le asigna un 0
		if( $valor_impuesto.val()== null || $valor_impuesto.val()== ''){
			$valor_impuesto.val(0);
		}
		
		importe = parseFloat(importe).toFixed(4);
		
		if (parseFloat(idImp)!=0 && parseFloat(valorImp)!=0){
			$id_impuesto.val(idImp);
			$valor_impuesto.val(valorImp);
			importeImpuesto = parseFloat(importe) * parseFloat(valorImp);
			importeImpuesto = parseFloat(importeImpuesto).toFixed(4);
		}
		
		
		
		
		var encontrado = 0;
		//busca el sku y la presentacion en el grid
		$grid_productos.find('tr').each(function (index){
			if(( $(this).find('#skuprod').val() == sku.toUpperCase() )  && (parseInt($(this).find('#idpres').val())== parseInt(id_pres) ) && (parseInt($(this).find('#elim').val())!=0)){
				encontrado=1;//el producto ya esta en el grid
			}
		});
		
		if(parseInt(encontrado)!=1){//si el producto no esta en el grid entra aqui
			//obtiene numero de trs
			var tr = $("tr", $grid_productos).size();
			tr++;
			
			var trr = '';
			trr = '<tr>';
				trr += '<td class="grid" style="font-size:11px;  border:1px solid #C1DAD7;" width="40">';
					trr += '<a href="elimina_producto" id="delete'+ tr +'">Eliminar</a>';
					trr += '<input type="hidden" name="eliminado" class="elim'+ tr +'" id="elim" value="1">';//el 1 significa que el registro no ha sido eliminado
					trr += '<input type="hidden" name="iddetalle" class="iddetalle'+ tr +'" id="idd" value="'+id_detalle+'">';//este es el id del registro que ocupa el producto en la tabla cotizacions_detalles
					trr += '<input type="hidden" name="notr" class="notr'+ tr +'" value="'+ tr +'">';
				trr += '</td>';
				trr += '<td class="grid1" style="font-size:11px;  border:1px solid #C1DAD7;" width="100">';
					trr += '<input type="hidden" name="idproducto" class="borde_oculto" id="idprod" value="'+ id_prod +'">';
					trr += '<input type="text" name="sku" value="'+ sku +'" id="skuprod" class="borde_oculto" readOnly="true" style="width:96px;">';
				trr += '</td>';
				trr += '<td class="grid1" style="font-size:11px;  border:1px solid #C1DAD7;" width="180">';
					trr += '<input type="text" 	name="nombre" 	value="'+ titulo +'" 	id="nom" class="borde_oculto" readOnly="true" style="width:176px;">';
				trr += '</td>';
				
				var altura_td='';
				if(imagen != ""){
					altura_td='height="90"';
				}
				
				trr += '<td class="grid1" id="td_imagen" style="font-size:11px;  border:1px solid #C1DAD7;" width="100" '+altura_td+' >';
					trr += '<div class="div_img'+ tr +'" style="width:96px; height:90px;" border="1">';
						trr += '<img id="contenidofileimg'+tr+'" src="#" align="top" width="96" height="90">';
					trr += '</div>';
				trr += '</td>';
				trr += '<td class="grid1" id="td_descripcion" style="font-size:11px;  border:1px solid #C1DAD7;" width="220">';
					trr += '<textarea name="descripcion" id="desc'+ tr +'" readOnly="true" class="borde_oculto" cols="10" rows="5" readOnly="true" style="width:216px; height:90px; resize:none; background-color:#FFFFF;">'+descripcion+'</textarea>';
				trr += '</td>';
				
				trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="90">';
					trr += '<input type="text" 	name="unidad" value="'+ unidad +'" id="uni" class="borde_oculto" readOnly="true" style="width:86px;">';
				trr += '</td>';
				
				trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="100">';
					trr += '<INPUT type="hidden" name="id_presentacion" class="id_pres'+ tr +'" value="'+  id_pres +'" 	id="idpres">';
					trr += '<INPUT TYPE="text" name="presentacion'+ tr +'" class="borde_oculto" value="'+  pres +'" id="pres"  readOnly="true" style="width:96px;">';
				trr += '</td>';
				
				trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="70">';
					trr += '<input type="text" name="cantidad" class="cant'+ tr +'" value="'+cantidad+'" id="cant" style="width:66px;">';
				trr += '</td>';
				
				trr += '<td class="grid2" style="font-size: 11px;  border:1px solid #C1DAD7;" width="80">';
					trr += '<input type="text" name="precio" class="precio'+ tr +'" value="'+precioCambiado+'" id="cost" style="width:76px;">';
					trr += '<input type="text" value="'+precioOriginal+'" class="precor'+ tr +'" id="precor" style="width:76px;">';
				trr += '</td>';
				
				trr += '<td class="grid1" style="font-size: 11px;  border:1px solid #C1DAD7;" width="50">';
					trr += '<select name="monedagrid" class="moneda'+ tr +'" style="width:46px;"></select>';
				trr += '</td>';
				
				trr += '<td class="grid2" style="font-size: 11px;  border:1px solid #C1DAD7;" width="70">';
					trr += '<input type="text" 	name="importe" 	class="import'+ tr +'" value="'+importe+'" id="import" readOnly="true" style="width:66px; text-align:right;">';
					trr += '<input type="hidden" name="id_imp_prod"   value="'+  $id_impuesto.val() +'" id="idimppord">';
					trr += '<input type="text" name="valor_imp"     value="'+  $valor_impuesto.val() +'" id="ivalorimp">';
					trr += '<input type="text" name="totimpuesto'+ tr +'" id="totimp" value="'+importeImpuesto+'">';
				trr += '</td>';
				
			trr += '</tr>';
			$grid_productos.append(trr);
			
			$aplicar_evento_click_checkbox($check_descripcion_larga);
			
			if(imagen != ""){
				var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
				var input_json_img = document.location.protocol + '//' + document.location.host + '/' + controller + '/imgDownloadImg/'+imagen+'/'+id_prod+'/'+iu+'/out.json';
				$('#forma-cotizacions-window').find('#contenidofileimg'+tr).removeAttr("src").attr("src",input_json_img);
			}
            
            //ocultar tds  si no esta seleccionado el checkbox de descripcion larga
            if( !$check_descripcion_larga.is(':checked') ){
				$grid_productos.find('#td_imagen').hide();
				$grid_productos.find('#td_descripcion').hide();
			}
			
			//si la descripcion larga viene vacia entonces no mostramos el txtarea
			if(descripcion=="" && imagen == ""){
				$grid_productos.find('#desc'+tr).hide();
				$grid_productos.find('.div_img'+tr).hide();
			}
			
			//carga el select de monedas  con la moneda del cliente seleccionada por default
			$grid_productos.find('.moneda'+ tr).children().remove();
			var moneda_hmtl = '';
			$.each(arrayMonedas ,function(entryIndex,moneda){
				if( parseInt(moneda['id']) == parseInt(mon_id) ){
					moneda_hmtl += '<option value="' + moneda['id'] + '" selected="yes">' + moneda['descripcion_abr'] + '</option>';
				}else{
					//moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion_abr'] + '</option>';
				}
			});
			$grid_productos.find('.moneda'+ tr).append(moneda_hmtl);
			
			
			//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
			$grid_productos.find('.cant'+ tr).focus(function(e){
				if($(this).val() == ' '){
					$(this).val('');
				}else{
					if(parseInt($(this).val()) <=0 ){
						$(this).val('');
					}
				}
			});
			
			//recalcula importe al perder enfoque el campo cantidad
			$grid_productos.find('.cant'+ tr).blur(function(){
				$precioPartida = $(this).parent().parent().find('.precio'+ tr);
				$importePartida = $(this).parent().parent().find('.import'+ tr);
				$tasaIva = $(this).parent().parent().find('#ivalorimp');
				$totalImpuestoPartida = $(this).parent().parent().find('#totimp');
				var $idMonedaPartida = $(this).parent().parent().find('.moneda'+ tr);
				
				if ($(this).val()=='' || $(this).val()==' '){
					$(this).val(0);
				}
				//$(this).val(parseFloat($(this).val()).toFixed(2));
				
				if( $(this).val()!=' ' && $(this).val()!='' && $precioPartida.val()!=' ' && $precioPartida.val()!='' )
				{   //calcula el importe
					$importePartida.val(parseFloat($(this).val()) * parseFloat(quitar_comas($precioPartida.val())));
					
					$importePartida.val(parseFloat(quitar_comas($importePartida.val())).toFixed(4));
					
					//redondea el importe en dos decimales
					if(parseInt($moneda_original.val()) == parseInt($idMonedaPartida.val())){
						$importePartida.val(parseFloat($importePartida.val()).toFixed(4));
					}else{
						$importePartida.val(parseFloat($importePartida.val()).toFixed(4));
					}
					
					//calcula el impuesto para este producto multiplicando el importe por el valor del iva
					$totalImpuestoPartida.val( parseFloat(parseFloat( $importePartida.val() ) * parseFloat(  $tasaIva.val()  ) ).toFixed(4));
				}else{
					$importePartida.val('');
				}
				
				$recalcula_totales();
			});
			
			//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
			$grid_productos.find('.precio'+ tr).focus(function(e){
				if($(this).val()==' '){
					$(this).val('');
				}else{
					if(parseInt($(this).val()) <= 0 ){
						$(this).val('');
					}
				}
			});
            
			//recalcula importe al perder enfoque el campo costo
			$grid_productos.find('.precio'+ tr).blur(function(){
				var $catidadPartida = $(this).parent().parent().find('.cant'+ tr);
				var $importePartida = $(this).parent().parent().find('.import'+ tr);
				var $tasaIva = $(this).parent().parent().find('#ivalorimp');
				var $totalImpuestoPartida = $(this).parent().parent().find('#totimp');
				var $idMonedaPartida = $(this).parent().parent().find('.moneda'+ tr);
				var $precioOriginalPartida = $(this).parent().parent().find('.precor'+ tr);
				var precioCambiado=0.0;
				
				if ($(this).val()=='' || $(this).val()==' '){
					$(this).val(0);
				}
				
				if(parseFloat($(this).val()) > 0){
					
					//alert("moneda_original:"+$moneda_original.val()+ "		idMonedaPartida:"+$idMonedaPartida.val());
					//si la moneda inicial de la cotizacion es diferente a la moneda actual seleccionada
					//entonces recalculamos los precios de acuerdo al tipo de cambio
					if( parseInt($moneda_original.val()) != parseInt($idMonedaPartida.val()) ){
						
						if(parseInt($moneda_original.val())==1 && parseInt($idMonedaPartida.val())!=1){
							//si la moneda original es pesos, calculamos su equivalente a dolares
							precioCambiado = parseFloat( parseFloat($(this).val()) * parseFloat($tc.val())).toFixed(4);
						}
						
						if(parseInt($moneda_original.val())!=1 && parseInt($idMonedaPartida.val())==1){
							//alert("precioOriginal:"+precioOriginal +"		tc_original:"+$tc_original.val());
							//si la moneda original es dolar y la moneda del precio es Pesos, calculamos su equivalente a dolar
							precioCambiado = parseFloat( parseFloat($(this).val()) / parseFloat($tc_original.val()) ).toFixed(4);
						}
						
					}else{
						precioCambiado = $(this).val();
					}
				}else{
					precioCambiado = $(this).val();
				}
				
				$precioOriginalPartida.val(precioCambiado);
				
				
				//$(this).val(parseFloat($(this).val()).toFixed(2));
				
				if( $(this).val()!=' ' && $(this).val()!='' && $catidadPartida.val()!=' ' && $catidadPartida.val() != '' ){
					//calcula el importe
					$importePartida.val( parseFloat($(this).val()) * parseFloat(quitar_comas($catidadPartida.val())) );
					
					//redondea el importe en dos decimales
					$importePartida.val(parseFloat(quitar_comas($importePartida.val())).toFixed(4));
					//$importePartida.val(Math.round(parseFloat(quitar_comas($importePartida.val()))*100)/100);
					
					
					if(parseInt($moneda_original.val()) == parseInt($idMonedaPartida.val())){
						$importePartida.val(parseFloat($importePartida.val()).toFixed(4));
					}else{
						$importePartida.val(parseFloat($importePartida.val()).toFixed(4));
					}
					
					//calcula el impuesto para este producto multiplicando el importe por la tasa del iva
					$totalImpuestoPartida.val( parseFloat( parseFloat( quitar_comas( $importePartida.val() ) ) * parseFloat(  $tasaIva.val()  )).toFixed(4));
				}else{
					$importePartida.val('');
				}
				
				$recalcula_totales();
			});
			
			//validar campo costo, solo acepte numeros y punto
			$grid_productos.find('.precio'+ tr).keypress(function(e){
				// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
				if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
					return true;
				}else {
					return false;
				}		
			});
			
			//validar campo cantidad, solo acepte numeros y punto
			$grid_productos.find('.cant'+ tr).keypress(function(e){
				// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
				if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
					return true;
				}else {
					return false;
				}		
			});
			
			
			//elimina un producto del grid
			$grid_productos.find('#delete'+ tr).bind('click',function(event){
				event.preventDefault();
				if(parseInt($(this).parent().find('.elim'+ tr).val()) != 0){
					//tomamos el valor de la partida eliminada
					var iddetalle= $(this).parent().find('.iddetalle'+ tr).val();
					var numTr= $(this).parent().find('.notr'+ tr).val();
					
					//asigna espacios en blanco a todos los input de la fila eliminada
					$(this).parent().parent().find('input').val(' ');
					
					//asigna un 0 al input eliminado como bandera para saber que esta eliminado
					$(this).parent().find('.elim'+ tr).val(0);//cambiar valor del campo a 0 para indicar que se ha elimnado
					$(this).parent().find('.iddetalle'+ tr).val(iddetalle);//le devolvemos el valor a la partida eliminada
					$(this).parent().find('.notr'+ tr).val(numTr);//le devolvemos el valor a la partida eliminada
					
					//oculta la fila eliminada
					$(this).parent().parent().hide();
					
					//recalcular los totales al eliminar un registro
					$recalcula_totales();
				}
			});
			
			$('#forma-cotizacions-window').find('input[name=sku_producto]').val('');
			$('#forma-cotizacions-window').find('input[name=nombre_producto]').val('');
			
			//asignar enfoque al campo cantidad que se acaba de agregar
			//$grid_productos.find('.cant'+ tr).focus();
			
		}else{
			jAlert('El producto: '+sku+' con presentacion: '+pres+' ya se encuentra en el listado, seleccione otro diferente.', 'Atencion!', function(r) { 
				$('#forma-cotizacions-window').find('input[name=nombre_producto]').val('');
				$('#forma-cotizacions-window').find('input[name=sku_producto]').focus();
			});
		}
		
	}//termina agregar producto al grid
	
	
	
	
	
	$aplicar_evento_click_checkbox = function($campo_check){
		//click al checkbox descripcion larga
		$campo_check.click(function(event){
			if(this.checked){
				$('#forma-cotizacions-window').find('input[name=razoncliente]').css({'width':'550px'});
				$('#forma-cotizacions-window').find('input[name=dircliente]').css({'width':'550px'});
				$('#forma-cotizacions-window').find('input[name=contactocliente]').css({'width':'550px'});
				$('#forma-cotizacions-window').find('#td_imagen').show();
				$('#forma-cotizacions-window').find('#td_descripcion').show();
				$('#forma-cotizacions-window').find('#td1').css({'width':'740px'});
				$('#forma-cotizacions-window').find('#td2').css({'width':'460px'});
				$('#forma-cotizacions-window').find('.contenedor_grid').css({'width':'1180px'});
				$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'width':'1213px'});
				$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'width':'1213px'});
				$('#forma-cotizacions-window').find('.cotizacions_div_two').css({'width':'1213px'});
				$('#forma-cotizacions-window').find('.cotizacions_div_three').css({'width':'1203px'});
				$('#forma-cotizacions-window').css({"margin-left": -480, 	"margin-top": -230});
				$('#forma-cotizacions-window').find('#titulo_plugin').css({'width':'1173px'});
				$('#forma-cotizacions-window').find('#div_botones').css({'width':'1190px'});
				$('#forma-cotizacions-window').find('#div_botones').find('.tabla_botones').find('.td_left').css({'width':'1090px'});
			}else{
				$('#forma-cotizacions-window').find('input[name=razoncliente]').css({'width':'430px'});
				$('#forma-cotizacions-window').find('input[name=dircliente]').css({'width':'430px'});
				$('#forma-cotizacions-window').find('input[name=contactocliente]').css({'width':'430px'});
				$('#forma-cotizacions-window').find('#td_imagen').hide();
				$('#forma-cotizacions-window').find('#td_descripcion').hide();
				$('#forma-cotizacions-window').find('#td1').css({'width':'520px'});
				$('#forma-cotizacions-window').find('#td2').css({'width':'350px'});
				$('#forma-cotizacions-window').find('.contenedor_grid').css({'width':'860px'});
				$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'width':'893px'});
				$('#forma-cotizacions-window').find('.cotizacions_div_two').css({'width':'893px'});
				$('#forma-cotizacions-window').find('.cotizacions_div_three').css({'width':'880px'});
				$('#forma-cotizacions-window').css({"margin-left": -320, 	"margin-top": -230});
				$('#forma-cotizacions-window').find('#titulo_plugin').css({'width':'853px'});
				$('#forma-cotizacions-window').find('#div_botones').css({'width':'870px'});
				$('#forma-cotizacions-window').find('#div_botones').find('.tabla_botones').find('.td_left').css({'width':'770px'});
			}
		});
	}
	
	
	
	$aplicar_evento_click_checkbox_incluye_iva = function($campo_check, incluyeCrm){
		//click al checkbox descripcion larga
		$campo_check.click(function(event){
			if(this.checked){
				$('#forma-cotizacions-window').find('.cotizacions_div_one').find('#tabla_totales').show();
				if(incluyeCrm=='true'){
					$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'560px'});
				}else{
					$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'590px'});
				}
			}else{
				$('#forma-cotizacions-window').find('.cotizacions_div_one').find('#tabla_totales').hide();
				if(incluyeCrm=='true'){
					$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'490px'});
				}else{
					$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'490px'});
				}
			}
		});
	}
	
	
	
	
	//calcula totales(subtotal, impuesto, total)
	$recalcula_totales = function(){
		var $campo_subtotal = $('#forma-cotizacions-window').find('input[name=subtotal]');
		var $campo_impuesto = $('#forma-cotizacions-window').find('input[name=impuesto]');
		var $campo_total = $('#forma-cotizacions-window').find('input[name=total]');
		var $valor_impuesto = $('#forma-cotizacions-window').find('input[name=valorimpuesto]');
		var $grid_productos = $('#forma-cotizacions-window').find('#grid_productos');
		
		var sumaSubTotal = 0; //es la suma de todos los importes
		var sumaImpuesto = 0; //valor del iva
		var sumaTotal = 0; //suma del subtotal + totalImpuesto
		
		//si  el campo tipo de cambio es null o vacio, se le asigna un 0
		if( $valor_impuesto.val()== null || $valor_impuesto.val()== ''){
			$valor_impuesto.val(0);
		}
		
		$grid_productos.find('tr').each(function (index){
			if(( $(this).find('#cost').val() != ' ') && ( $(this).find('#cant').val() != ' ' )){
				//acumula los importes en la variable subtotal
				sumaSubTotal = parseFloat(sumaSubTotal) + parseFloat( quitar_comas( $(this).find('#import').val() ) );
				if($(this).find('#totimp').val() != ''){
					sumaImpuesto =  parseFloat(sumaImpuesto) + parseFloat($(this).find('#totimp').val());
				}
			}
		});
		
		//calcula el total sumando el subtotal y el impuesto
		sumaTotal = parseFloat(sumaSubTotal) + parseFloat(sumaImpuesto);
		
		//redondea a dos digitos el  subtotal y lo asigna  al campo subtotal
		$campo_subtotal.val( $(this).agregar_comas( parseFloat(sumaSubTotal).toFixed(2) ) );
		//redondea a dos digitos el impuesto y lo asigna al campo impuesto
		$campo_impuesto.val( $(this).agregar_comas( parseFloat(sumaImpuesto).toFixed(2) ) );
		//redondea a dos digitos la suma  total y se asigna al campo total
		//$campo_total.val( $(this).agregar_comas( Math.round(parseFloat(sumaTotal)*100)/100) );
		$campo_total.val( $(this).agregar_comas( parseFloat(sumaTotal).toFixed(2) ) );
	}//termina calcular totales
    
	
	
	
    //convertir costos en dolar y pesos
	$convertir_costos = function(moneda_id){
		var $campo_subtotal = $('#forma-cotizacions-window').find('input[name=subtotal]');
		var $campo_impuesto = $('#forma-cotizacions-window').find('input[name=impuesto]');
		var $campo_total = $('#forma-cotizacions-window').find('input[name=total]');
		var $tipo_cambio = $('#forma-cotizacions-window').find('input[name=tc]');
		var $tc_original = $('#forma-cotizacions-window').find('input[name=tc_original]');
		var $valor_impuesto = $('#forma-cotizacions-window').find('input[name=valorimpuesto]');
		var $grid_productos = $('#forma-cotizacions-window').find('#grid_productos');
		var $moneda_original = $('#forma-cotizacions-window').find('select[name=moneda2]');
		
		var sumaSubTotal = 0; //es la suma de todos los importes
		var sumaImpuesto = 0; //valor del iva
		var sumaTotal = 0; //suma del subtotal + totalImpuesto
		
		//si  el campo tipo de cambio es null o vacio, se le asigna un 0
		if( $valor_impuesto.val()== null || $valor_impuesto.val()== ''){
			$valor_impuesto.val(0);
		}
		
		$grid_productos.find('tr').each(function (index){
			var precio_cambiado=0;
			var importe_cambiado=0;
			if(( $(this).find('#cost').val() != ' ') && ( $(this).find('#cant').val() != ' ' )){
				
				if( parseInt($moneda_original.val()) != parseInt(moneda_id) ){
					if(parseInt($moneda_original.val())==1 && parseInt(moneda_id)!=1){
						//si la moneda original es pesos, calculamos su equivalente a dolares
						precio_cambiado = parseFloat(quitar_comas($(this).find('#precor').val())) / parseFloat($tipo_cambio.val());
					}
					
					if(parseInt($moneda_original.val())!=1 && parseInt(moneda_id)==1){
						//si la moneda original es dolar, calculamos su equivalente a pesos
						precio_cambiado = parseFloat(quitar_comas($(this).find('#precor').val())) * parseFloat($tc_original.val());
					}
					
					$(this).find('#cost').val($(this).agregar_comas(parseFloat(precio_cambiado).toFixed(4)));
					//calcula el nuevo importe
					importe_cambiado = parseFloat($(this).find('#cant').val()) * parseFloat(precio_cambiado).toFixed(4);
					//asignamos el nuevo laor del importe
					$(this).find('#import').val($(this).agregar_comas(parseFloat(importe_cambiado).toFixed(4) ) );
				}else{
					//aqui entra si la moneda seleccionada es la moneda original. Le devolvemos al campo costo su valor original
					$(this).find('#cost').val( $(this).find('#precor').val()  );
					//calcula el nuevo importe
					importe_cambiado = parseFloat($(this).find('#cant').val()) * parseFloat($(this).find('#cost').val()).toFixed(4);
					//asignamos el nuevo laor del importe
					$(this).find('#import').val($(this).agregar_comas(parseFloat(importe_cambiado).toFixed(4) ) );
				}
				
				//acumula los importes en la variable subtotal
				sumaSubTotal = parseFloat(sumaSubTotal) + parseFloat(quitar_comas($(this).find('#import').val()));
				if($(this).find('#totimp').val() != ''){
					$(this).find('#totimp').val(parseFloat( quitar_comas($(this).find('#import').val()) ) * parseFloat($valor_impuesto.val()));
					sumaImpuesto =  parseFloat(sumaImpuesto) + parseFloat($(this).find('#totimp').val());
				}
			}
		});
		
		//calcula el total sumando el subtotal y el impuesto
		sumaTotal = parseFloat(sumaSubTotal) + parseFloat(sumaImpuesto);
		//redondea a dos digitos el  subtotal y lo asigna  al campo subtotal
		$campo_subtotal.val($(this).agregar_comas(parseFloat(sumaSubTotal).toFixed(2)));
		//redondea a dos digitos el impuesto y lo asigna al campo impuesto
		$campo_impuesto.val($(this).agregar_comas(parseFloat(sumaImpuesto).toFixed(2)));
		//redondea a dos digitos la suma  total y se asigna al campo total
		$campo_total.val($(this).agregar_comas(parseFloat(sumaTotal).toFixed(2)));
		/*
		if( parseInt($moneda_original.val()) != parseInt(moneda_id) ){
			//calcula el total sumando el subtotal y el impuesto
			sumaTotal = parseFloat(sumaSubTotal) + parseFloat(sumaImpuesto);
			//redondea a 4 digitos el  subtotal y lo asigna  al campo subtotal
			$campo_subtotal.val($(this).agregar_comas(parseFloat(sumaSubTotal).toFixed(4)));
			//redondea a 4 digitos el impuesto y lo asigna al campo impuesto
			$campo_impuesto.val($(this).agregar_comas(parseFloat(sumaImpuesto).toFixed(4)));
			//redondea a 4 digitos la suma  total y se asigna al campo total
			$campo_total.val($(this).agregar_comas(parseFloat(sumaTotal).toFixed(4)));
		}else{
			//calcula el total sumando el subtotal y el impuesto
			sumaTotal = parseFloat(sumaSubTotal) + parseFloat(sumaImpuesto);
			//redondea a dos digitos el  subtotal y lo asigna  al campo subtotal
			$campo_subtotal.val($(this).agregar_comas(parseFloat(sumaSubTotal).toFixed(2)));
			//redondea a dos digitos el impuesto y lo asigna al campo impuesto
			$campo_impuesto.val($(this).agregar_comas(parseFloat(sumaImpuesto).toFixed(2)));
			//redondea a dos digitos la suma  total y se asigna al campo total
			$campo_total.val($(this).agregar_comas(parseFloat(sumaTotal).toFixed(2)));
		}
		*/
	}//termina convertir dolar pesos

	
	
	
	
	
	//obtener el tipo de cambio de acuerdo al id de la moneda
	getTcIdMoneda = function(idMoneda, cambiarTcOriginal){
		var $tipo_cambio = $('#forma-cotizacions-window').find('input[name=tc]');
		var $tc_original = $('#forma-cotizacions-window').find('input[name=tc_original]');
		
		var inputJsonTc = document.location.protocol + '//' + document.location.host + '/'+controller+'/getValorTc.json';
		var $arreglo2 = {'idmon':idMoneda };
		
		$.post(inputJsonTc,$arreglo2,function(entry){
			$tipo_cambio.val(entry['valor']);
			if(cambiarTcOriginal=='true'){
				$tc_original.val(entry['valor']);
			}
			
			if(parseInt(idMoneda)==1){
				$tipo_cambio.attr("readonly", true);
				$tipo_cambio.css({'background' : '#F0F0F0'});
			}else{
				$tipo_cambio.attr("readonly", false);
				$tipo_cambio.css({'background' : '#ffffff'});
			}
			
			$convertir_costos(idMoneda);
		},"json");//termina llamada json
	}
	
	
	
	
	//nueva cotizacion
	$new_cotizacion.click(function(event){
		event.preventDefault();
		var id_to_show = 0;
		
		$(this).modalPanel_cotizacions();
		
		var form_to_show = 'formaCotizacions00';
		$('#' + form_to_show).each (function(){this.reset();});
		var $forma_selected = $('#' + form_to_show).clone();
		$forma_selected.attr({id : form_to_show + id_to_show});
		//var accion = "getCotizacion";
		
		$('#forma-cotizacions-window').css({"margin-left": -480, 	"margin-top": -230});
		
		$forma_selected.prependTo('#forma-cotizacions-window');
		$forma_selected.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
		
		$tabs_li_funxionalidad();
		
		var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getCotizacion.json';
		$arreglo = {'id_cotizacion':id_to_show,
					'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
					};
                
		var $tr_tipo = $('#forma-cotizacions-window').find('#tr_tipo');
		var $td_imagen = $('#forma-cotizacions-window').find('#td_imagen');
		var $td_descripcion = $('#forma-cotizacions-window').find('#td_descripcion');
		var $td1 = $('#forma-cotizacions-window').find('#td1');
		var $td2 = $('#forma-cotizacions-window').find('#td2');
		var $check_descripcion_larga =$('#forma-cotizacions-window').find('input[name=check_descripcion_larga]');
		var $check_incluye_iva =$('#forma-cotizacions-window').find('input[name=check_incluye_iva]');
		var $contenedor_grid = $('#forma-cotizacions-window').find('.contenedor_grid');
		
		var $id_cotizacion = $('#forma-cotizacions-window').find('input[name=id_cotizacion]');
		var $total_tr = $('#forma-cotizacions-window').find('input[name=total_tr]');
		var $select_tipo_cotizacion = $('#forma-cotizacions-window').find('select[name=select_tipo_cotizacion]');
		var $folio = $('#forma-cotizacions-window').find('input[name=folio]');
		var $select_accion = $('#forma-cotizacions-window').find('select[name=select_accion]');
		
		var $busca_cliente = $('#forma-cotizacions-window').find('a[href*=busca_cliente]');
		var $id_cliente = $('#forma-cotizacions-window').find('input[name=id_cliente]');
		var $rfc_cliente = $('#forma-cotizacions-window').find('input[name=rfccliente]');
		var $nocontrolcliente = $('#forma-cotizacions-window').find('input[name=nocontrolcliente]');
		var $razon_cliente = $('#forma-cotizacions-window').find('input[name=razoncliente]');
		var $dir_cliente = $('#forma-cotizacions-window').find('input[name=dircliente]');
		var $contactocliente = $('#forma-cotizacions-window').find('input[name=contactocliente]');
		var $select_moneda = $('#forma-cotizacions-window').find('select[name=moneda]');
		var $select_moneda_original = $('#forma-cotizacions-window').find('select[name=moneda2]');
		var $tc = $('#forma-cotizacions-window').find('input[name=tc]');
		var $tc_original = $('#forma-cotizacions-window').find('input[name=tc_original]');
		
		var $fecha = $('#forma-cotizacions-window').find('input[name=fecha]');
		var $vigencia = $('#forma-cotizacions-window').find('input[name=vigencia]');
		var $select_agente = $('#forma-cotizacions-window').find('select[name=select_agente]');
		var $select_incoterms = $('#forma-cotizacions-window').find('select[name=select_incoterms]');
		
		//var $campo_tc = $('#forma-cotizacions-window').find('input[name=tc]');
		var $id_impuesto = $('#forma-cotizacions-window').find('input[name=id_impuesto]');
		var $valor_impuesto = $('#forma-cotizacions-window').find('input[name=valorimpuesto]');
		var $observaciones = $('#forma-cotizacions-window').find('textarea[name=observaciones]');
		
		//var $select_almacen = $('#forma-cotizacions-window').find('select[name=almacen]');
		var $sku_producto = $('#forma-cotizacions-window').find('input[name=sku_producto]');
		var $nombre_producto = $('#forma-cotizacions-window').find('input[name=nombre_producto]');
		
		//buscar producto
		var $busca_sku = $('#forma-cotizacions-window').find('a[href*=busca_sku]');
		//href para agregar producto al grid
		var $agregar_producto = $('#forma-cotizacions-window').find('a[href*=agregar_producto]');
		
		var $boton_genera_pdf = $('#forma-cotizacions-window').find('#genera_pdf');
		
		//grid de productos
		var $grid_productos = $('#forma-cotizacions-window').find('#grid_productos');
		//grid de errores
		var $grid_warning = $('#forma-cotizacions-window').find('#div_warning_grid').find('#grid_warning');
		
		//var $flete = $('#forma-cotizacions-window').find('input[name=flete]');
		var $subtotal = $('#forma-cotizacions-window').find('input[name=subtotal]');
		var $impuesto = $('#forma-cotizacions-window').find('input[name=impuesto]');
		var $total = $('#forma-cotizacions-window').find('input[name=total]');
		
		
		var $cerrar_plugin = $('#forma-cotizacions-window').find('#close');
		var $cancelar_plugin = $('#forma-cotizacions-window').find('#boton_cancelar');
		var $submit_actualizar = $('#forma-cotizacions-window').find('#submit');
		
		
		$id_cotizacion.val(0);//para nueva cotizacion el folio es 0
		$select_moneda_original.hide();
		
		//quitar enter a todos los campos input
		$('#forma-cotizacions-window').find('input').keypress(function(e){
			if(e.which==13 ) {
				return false;
			}
		});
		
				
		//$campo_factura.css({'background' : '#ffffff'});
		
		//ocultar boton de generar pdf. Solo debe estar activo en editar
		$boton_genera_pdf.hide();
		//$descripcion_larga.hide();
		$tr_tipo.hide();
		$dir_cliente.attr('readonly',true);
		$folio.css({'background' : '#F0F0F0'});
		$dir_cliente.css({'background' : '#F0F0F0'});
		$contactocliente.css({'background' : '#F0F0F0'});
		//$fecha.css({'background' : '#F0F0F0'});
		
		$fecha.val(mostrarFecha());//mostrar la fecha actual
		$fecha.click(function (s){
			var a=$('div.datepicker');
			a.css({'z-index':100});
		});
		
		$fecha.DatePicker({
			format:'Y-m-d',
			date: $fecha.val(),
			current: $fecha.val(),
			starts: 1,
			position: 'bottom',
			locale: {
				days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
				daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
				daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
				months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
				monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
				weekMin: 'se'
			},
			onChange: function(formated, dates){
				var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
				$fecha.val(formated);
				if (formated.match(patron) ){
					var valida_fecha=mayor($fecha.val(),mostrarFecha());
					
					if (valida_fecha==true){
						$fecha.DatePickerHide();
					}else{
						jAlert("Fecha no valida, debe ser mayor a la actual.",'! Atencion');
						$fecha.val(mostrarFecha());
					}
				}
			}
		});
		
		//seleccionar por default
		$check_incluye_iva.attr('checked', true );
		
		$('#forma-cotizacions-window').find('input[name=razoncliente]').css({'width':'430px'});
		$('#forma-cotizacions-window').find('input[name=dircliente]').css({'width':'430px'});
		$('#forma-cotizacions-window').find('input[name=contactocliente]').css({'width':'430px'});
		$('#forma-cotizacions-window').find('#td_imagen').hide();
		$('#forma-cotizacions-window').find('#td_descripcion').hide();
		$('#forma-cotizacions-window').find('#td1').css({'width':'520px'});
		$('#forma-cotizacions-window').find('#td2').css({'width':'350px'});
		$('#forma-cotizacions-window').find('.contenedor_grid').css({'width':'860px'});
		$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'width':'893px'});
		$('#forma-cotizacions-window').find('.cotizacions_div_two').css({'width':'893px'});
		$('#forma-cotizacions-window').find('.cotizacions_div_three').css({'width':'880px'});
		$('#forma-cotizacions-window').css({"margin-left": -320, 	"margin-top": -230});
		$('#forma-cotizacions-window').find('#titulo_plugin').css({'width':'853px'});
		$('#forma-cotizacions-window').find('#div_botones').css({'width':'870px'});
		$('#forma-cotizacions-window').find('#div_botones').find('.tabla_botones').find('.td_left').css({'width':'770px'});
		
		$nocontrolcliente.focus();
		
		var respuestaProcesada = function(data){
			if ( data['success'] == "true" ){
				jAlert("La cotizaci&oacute;n se guard&oacute; con exito", 'Atencion!');
				var remove = function() {$(this).remove();};
				$('#forma-cotizacions-overlay').fadeOut(remove);
				$get_datos_grid();
			}else{
				// Desaparece todas las interrogaciones si es que existen
				//$('#forma-cotizacions-window').find('.div_one').css({'height':'545px'});//sin errores
				$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'600px'});//con errores
				$('#forma-cotizacions-window').find('div.interrogacion').css({'display':'none'});
				
				$grid_productos.find('#cant').css({'background' : '#ffffff'});
				$grid_productos.find('#cost').css({'background' : '#ffffff'});
				
				$('#forma-cotizacions-window').find('#div_warning_grid').css({'display':'none'});
				$('#forma-cotizacions-window').find('#div_warning_grid').find('#grid_warning').children().remove();
				
				var valor = data['success'].split('___');
				//muestra las interrogaciones
				for (var element in valor){
					tmp = data['success'].split('___')[element];
					longitud = tmp.split(':');

					if( longitud.length > 1 ){
						$('#forma-cotizacions-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
						.parent()
						.css({'display':'block'})
						.easyTooltip({tooltipId: "easyTooltip2",content: tmp.split(':')[1]});
						
						//alert(tmp.split(':')[0]);
						var campo = tmp.split(':')[0];
						var $campo_input;
						
						if((tmp.split(':')[0].substring(0, 4) == 'cant') || (tmp.split(':')[0].substring(0, 6) == 'precio')){
							$('#forma-cotizacions-window').find('#div_warning_grid').css({'display':'block'});
							$campo_input = $grid_productos.find('.'+campo);
							$campo_input.css({'background' : '#d41000'});
							$campo_input.focus();
							
							var codigo_producto = $campo_input.parent().parent().find('input[name=sku]').val();
							var titulo_producto = $campo_input.parent().parent().find('input[name=nombre]').val();
							
							var tr_warning = '<tr>';
									tr_warning += '<td width="20"><div><IMG SRC="../../img/icono_advertencia.png" ALIGN="top" rel="warning_sku"></td>';
									tr_warning += '<td width="120"><INPUT TYPE="text" value="' + codigo_producto + '" class="borde_oculto" readOnly="true" style="width:116px; color:red"></td>';
									tr_warning += '<td width="200"><INPUT TYPE="text" value="' + titulo_producto + '" class="borde_oculto" readOnly="true" style="width:196px; color:red"></td>';
									tr_warning += '<td width="235"><INPUT TYPE="text" value="'+  tmp.split(':')[1] +'" class="borde_oculto" readOnly="true" style="width:225px; color:red"></td>';
							tr_warning += '</tr>';
							
							$('#forma-cotizacions-window').find('#div_warning_grid').find('#grid_warning').append(tr_warning);
											
						}
					}
				}
				
				$grid_warning.find('tr:odd').find('td').css({'background-color' : '#FFFFFF'});
				$grid_warning.find('tr:even').find('td').css({'background-color' : '#e7e8ea'});
			}
		}
		
		var options = {dataType :  'json', success : respuestaProcesada};
		$forma_selected.ajaxForm(options);
		
		$.post(input_json,$arreglo,function(entry){
			//carga select de incoterms
			$select_incoterms.children().remove();
			var incoterms_hmtl = '';
			$.each(entry['Incoterms'],function(entryIndex,incoterm){
				//incoterms_hmtl += '<option value="' + incoterm['id'] + '"  >' + incoterm['titulo'] + '</option>';
				incoterms_hmtl += incoterm['opcion_select'];
			});
			$select_incoterms.append(incoterms_hmtl);
			
			if(entry['Extras'][0]['mod_crm']=='true'){
				$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'550px'});
				$tr_tipo.show();//mostrar tr para escoger el tipo destino de la cotizacion
			}
			$aplicar_evento_click_checkbox_incluye_iva($check_incluye_iva, entry['Extras'][0]['mod_crm']);
			
			//carga select denominacion con todas las monedas
			$select_moneda.children().remove();
			var moneda_hmtl = '';
			$.each(entry['Monedas'],function(entryIndex,moneda){
				moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
			});
			$select_moneda.append(moneda_hmtl);
			$select_moneda_original.append(moneda_hmtl);//este  esta oculto
			
			$id_impuesto.val(entry['iva']['0']['id_impuesto']);
			$valor_impuesto.val(entry['iva']['0']['valor_impuesto']);
			
			//carga select de agentes
			$select_agente.children().remove();
			var agen_hmtl = '';
			$.each(entry['Agentes'],function(entryIndex,agen){
				agen_hmtl += '<option value="' + agen['id'] + '"  >' + agen['nombre_agente'] + '</option>';
			});
			$select_agente.append(agen_hmtl);
						
			//buscador de clientes
			$busca_cliente.click(function(event){
				event.preventDefault();
				$busca_clientes($select_tipo_cotizacion.val(), $nocontrolcliente.val(), $razon_cliente.val(), entry['Monedas'], entry['Agentes']);
			});
			
			//agregar producto al grid
			$agregar_producto.click(function(event){
				event.preventDefault();
				$buscador_presentaciones_producto($rfc_cliente.val(), $sku_producto.val(),$nombre_producto,$grid_productos, entry['Monedas']);
			});
			
			
			//busca datos del cliente al pulsar enter sobre en campo numero de control
			$nocontrolcliente.keypress(function(e){
				if(e.which == 13){
					var input_json2 = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDataByNoControl.json';
					$arreglo2 = {'tipo':$select_tipo_cotizacion.val(), 'no_control':$nocontrolcliente.val(),  'iu':$('#lienzo_recalculable').find('input[name=iu]').val() };
					
					$.post(input_json2,$arreglo2,function(entry2){
						if(parseInt(entry2['Resultado'].length) > 0 ){
							var num_lista_precio = entry2['Resultado'][0]['lista_precio'];
							var id_cliente = entry2['Resultado'][0]['id'];
							var numero_control = entry2['Resultado'][0]['numero_control'];
							var razon_social_cliente = entry2['Resultado'][0]['razon_social'];
							var dir_cliente = entry2['Resultado'][0]['direccion'];
							var id_moneda_cliente = entry2['Resultado'][0]['moneda_id'];
							var id_agente = entry2['Resultado'][0]['cxc_agen_id'];
							var rfc_cliente = entry2['Resultado'][0]['rfc'];
							var contacto_cliente = entry2['Resultado'][0]['contacto'];
							
							$agregarDatosClienteSeleccionado(entry['Monedas'], entry['Agentes'], num_lista_precio, id_cliente, numero_control, rfc_cliente, razon_social_cliente, dir_cliente, contacto_cliente, id_moneda_cliente, id_agente);
							
						}else{
							//limpiar campos
							$('#forma-cotizacions-window').find('input[name=id_cliente]').val('');
							$('#forma-cotizacions-window').find('input[name=nocontrolcliente]').val('');
							$('#forma-cotizacions-window').find('input[name=rfccliente]').val('');
							$('#forma-cotizacions-window').find('input[name=razoncliente]').val('');
							$('#forma-cotizacions-window').find('input[name=dircliente]').val('');
							$('#forma-cotizacions-window').find('input[name=contactocliente]').val('');
							$('#forma-cotizacions-window').find('input[name=num_lista_precio]').val('');
							
							jAlert('N&uacute;mero de cliente desconocido.', 'Atencion!', function(r) { 
								$nocontrolcliente.focus(); 
							});
							
						}
					},"json");//termina llamada json
					
					return false;
				}
			});
			
			//aqui se pone el tipo de cambio de acuerdo a la Moneda seleccionada
			if(parseInt($select_moneda.val())==1){
				$tc.val(parseFloat(1).toFixed(4));
				$tc_original.val($tc.val());
				//$tc_original
			}
			
			if(parseInt($select_moneda.val())==2){
				$tc.val(parseFloat(entry['Tc']['0']['tipo_cambio']).toFixed(4));
				$tc_original.val($tc.val());
			}
			
			
			//cambiar moneda
			$select_moneda.change(function(){
				var idMonSeleccionado = $(this).val();
				var cambiarTcOriginal='false';
				
				//si la moneda actual seleccionada es igual a la moneda original entonces permitir cambiar el tipo de cambio original
				if( parseInt($select_moneda_original.val()) == parseInt($select_moneda.val()) ){
					cambiarTcOriginal='true';
				}
				
				//ejecutar funcion al cambiar la moneda
				getTcIdMoneda(idMonSeleccionado, cambiarTcOriginal);
				
				
				//alert("select_moneda: "+$select_moneda.find('option:selected').val()+"   seleccionado:"+seleccionado);
				//cambiar la moneda de las partidas del grid al cambiar la moneda
				$grid_productos.find('select[name=monedagrid]').children().remove();
				var moneda_grid_hmtl = '';
				$.each(entry['Monedas'],function(entryIndex,moneda){
					if(parseInt(idMonSeleccionado) == parseInt(moneda['id'])){
						moneda_grid_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion_abr'] + '</option>';
					}
				});
				$grid_productos.find('select[name=monedagrid]').append(moneda_grid_hmtl);
			});
			
			//aplicar multiselect
			$select_incoterms.multiselect();
			
		},"json");//termina llamada json
		

		
		//carga select denominacion con todas las monedas
		$select_accion.children().remove();
		var accion_hmtl = '<option value="new">Nuevo</option>';
		//accion_hmtl = '<option value="edit">Actualizar</option>';
		$select_accion.append(accion_hmtl);
		
		
		//buscador de productos
		$busca_sku.click(function(event){
			event.preventDefault();
			$busca_productos($sku_producto.val(), $nombre_producto.val());
		});
		
		
		//aplicar tipo de cambio a todos los precios al cambiar valor de tipo de cambio
		$tc.blur(function(){
			if($(this).val()=='' || $(this).val()==' '){
				$(this).val(0);
			}
			
			//si la moneda actual seleccionada es igual a la moneda original entonces permitir cambiar el tipo de cambio original
			if( parseInt($select_moneda_original.val()) == parseInt($select_moneda.val()) ){
				$tc_original.val($(this).val());
			}
			
			$grid_productos.find('tr').each(function (index){
				var precio_cambiado=0;
				var importe_cambiado=0;
				
				if($(this).find('#cost').val()!=' ' && $(this).find('#cost').val()!=''){
					//si la moneda inicial de la cotizacion es diferente a la moneda actual seleccionada
					//entonces recalculamos los precios de acuerdo al tipo de cambio
					if( parseInt($select_moneda_original.val()) != parseInt($select_moneda.val()) ){
						
						if(parseInt($select_moneda_original.val())==1 && parseInt($select_moneda.val())!=1){
							//si la moneda original es pesos, calculamos su equivalente a dolares
							precio_cambiado = parseFloat($(this).find('#precor').val()) / parseFloat($tc.val());
						}
						
						if(parseInt($select_moneda_original.val())!=1 && parseInt($select_moneda.val())==1){
							//si la moneda original es dolar, calculamos su equivalente a pesos
							precio_cambiado = parseFloat($(this).find('#precor').val()) * parseFloat($tc_original.val());
						}
						
						$(this).find('#cost').val(parseFloat(precio_cambiado).toFixed(4));
						
						importe_cambiado = parseFloat($(this).find('#cant').val()) * parseFloat($(this).find('#cost').val());
						$(this).find('#import').val(parseFloat(importe_cambiado).toFixed(4));
						
					}else{
						//aqui no se cambia porque es la misma moneda en la que se hizo la cotizacion, asi que no se aplica tipo de cambio
					}
				}
			});
			$recalcula_totales();//llamada a la funcion que calcula totales
		});
		
		
		//pone cero al perder el enfoque
		$vigencia.blur(function(e){
			if(parseFloat($vigencia.val())==0||$vigencia.val()==""){
				$vigencia.val(0);
			}
		});
		
		
		//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
		$vigencia.focus(function(e){
			if(parseFloat($vigencia.val())<1){
				$vigencia.val('');
			}
		});
		
		
		//validar dias de vigencia
		$vigencia.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}		
		});
		
		//desencadena clic del href Agregar producto al pulsar enter en el campo sku del producto
		$sku_producto.keypress(function(e){
			if(e.which == 13){
				$agregar_producto.trigger('click');
				return false;
			}
		});
		
		
		//desencadena clic del href Buscar producto al pulsar enter en el campo Nombre del producto
		$nombre_producto.keypress(function(e){
			if(e.which == 13){
				$busca_sku.trigger('click');
				return false;
			}
		});
		
		
		//desencadena clic del href Buscar cliente al pulsar enter en el campo razon social del cliente
		$razon_cliente.keypress(function(e){
			if(e.which == 13){
				$busca_cliente.trigger('click');
				return false;
			}
		});
		
		
		$aplicar_evento_click_checkbox($check_descripcion_larga);
		
		
		
		//validar campo Tipo de Cambio, solo acepte numeros y punto
		$tc.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
		
		
		$submit_actualizar.bind('click',function(){
			var trCount = $("tr", $grid_productos).size();
			$total_tr.val(trCount);
			if(parseInt(trCount) > 0){
				return true;
			}else{
				jAlert('No hay datos para actualizar', 'Atencion!', function(r) { $sku_producto.focus(); });
				return false;
			}
		});
		
		//cerrar plugin
		$cerrar_plugin.bind('click',function(){
			var remove = function() {$(this).remove();};
			$('#forma-cotizacions-overlay').fadeOut(remove);
		});
		
		//boton cancelar y cerrar plugin
		$cancelar_plugin.click(function(event){
			var remove = function() {$(this).remove();};
			$('#forma-cotizacions-overlay').fadeOut(remove);
		});
	});
	
	
	
	var carga_formaCotizacions00_for_datagrid00 = function(id_to_show, accion_mode){
		//aqui entra para eliminar una entrada
		if(accion_mode == 'cancel'){
                     
			var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/' + 'logicDelete.json';
			$arreglo = {'id_cotizacion':id_to_show,
						'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
						};
			jConfirm('Realmente desea eliminar la cotizacion?', 'Dialogo de confirmacion', function(r) {
				if (r){
					$.post(input_json,$arreglo,function(entry){
						if ( entry['success'] == '1' ){
							jAlert("La cotizacion fue eliminada exitosamente", 'Atencion!');
							$get_datos_grid();
						}
						else{
							jAlert("La cotizacion no pudo ser eliminada", 'Atencion!');
						}
					},"json");
				}
			});
			
		}else{
			//aqui  entra para editar un registro
			$('#forma-cotizacions-window').remove();
			$('#forma-cotizacions-overlay').remove();
			
			var form_to_show = 'formaCotizacions00';
			$('#' + form_to_show).each (function(){this.reset();});
			var $forma_selected = $('#' + form_to_show).clone();
			$forma_selected.attr({id : form_to_show + id_to_show});
			
			$(this).modalPanel_cotizacions();
			
			$('#forma-cotizacions-window').css({"margin-left": -370, 	"margin-top": -230});
			
			$forma_selected.prependTo('#forma-cotizacions-window');
			$forma_selected.find('.panelcito_modal').attr({id : 'panelcito_modal' + id_to_show , style:'display:table'});
			
			$tabs_li_funxionalidad();
			
			
			//alert(id_to_show);
			
			if(accion_mode == 'edit'){
                                
				var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getCotizacion.json';
				$arreglo = {'id_cotizacion':id_to_show,
							'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
							};
				
				var $tr_tipo = $('#forma-cotizacions-window').find('#tr_tipo');
				var $td_imagen = $('#forma-cotizacions-window').find('#td_imagen');
				var $td_descripcion = $('#forma-cotizacions-window').find('#td_descripcion');
				var $td1 = $('#forma-cotizacions-window').find('#td1');
				var $td2 = $('#forma-cotizacions-window').find('#td2');
				var $check_descripcion_larga =$('#forma-cotizacions-window').find('input[name=check_descripcion_larga]');
				var $check_incluye_iva =$('#forma-cotizacions-window').find('input[name=check_incluye_iva]');
				var $contenedor_grid = $('#forma-cotizacions-window').find('.contenedor_grid');
				
				var $id_cotizacion = $('#forma-cotizacions-window').find('input[name=id_cotizacion]');
				var $total_tr = $('#forma-cotizacions-window').find('input[name=total_tr]');
				var $select_tipo_cotizacion = $('#forma-cotizacions-window').find('select[name=select_tipo_cotizacion]');
				var $folio = $('#forma-cotizacions-window').find('input[name=folio]');
				var $select_accion = $('#forma-cotizacions-window').find('select[name=select_accion]');
				var $num_lista_precio=  $('#forma-cotizacions-window').find('input[name=num_lista_precio]');
				
				var $busca_cliente = $('#forma-cotizacions-window').find('a[href*=busca_cliente]');
				var $id_cliente = $('#forma-cotizacions-window').find('input[name=id_cliente]');
				var $no_control_cliente = $('#forma-cotizacions-window').find('input[name=nocontrolcliente]');
				var $rfc_cliente = $('#forma-cotizacions-window').find('input[name=rfccliente]');
				var $razon_cliente = $('#forma-cotizacions-window').find('input[name=razoncliente]');
				var $dir_cliente = $('#forma-cotizacions-window').find('input[name=dircliente]');
				var $contactocliente = $('#forma-cotizacions-window').find('input[name=contactocliente]');
				var $select_moneda = $('#forma-cotizacions-window').find('select[name=moneda]');
				var $select_moneda_original = $('#forma-cotizacions-window').find('select[name=moneda2]');
				var $tc = $('#forma-cotizacions-window').find('input[name=tc]');
				var $tc_original = $('#forma-cotizacions-window').find('input[name=tc_original]');
				var $fecha = $('#forma-cotizacions-window').find('input[name=fecha]');
				var $vigencia = $('#forma-cotizacions-window').find('input[name=vigencia]');
				var $select_agente = $('#forma-cotizacions-window').find('select[name=select_agente]');
				var $select_incoterms = $('#forma-cotizacions-window').find('select[name=select_incoterms]');
				
				var $id_impuesto = $('#forma-cotizacions-window').find('input[name=id_impuesto]');
				var $valor_impuesto = $('#forma-cotizacions-window').find('input[name=valorimpuesto]');
				
				var $observaciones = $('#forma-cotizacions-window').find('textarea[name=observaciones]');
				
				var $sku_producto = $('#forma-cotizacions-window').find('input[name=sku_producto]');
				var $nombre_producto = $('#forma-cotizacions-window').find('input[name=nombre_producto]');
				
				//buscar producto
				var $busca_sku = $('#forma-cotizacions-window').find('a[href*=busca_sku]');
				//href para agregar producto al grid
				var $agregar_producto = $('#forma-cotizacions-window').find('a[href*=agregar_producto]');
				
				var $boton_genera_pdf = $('#forma-cotizacions-window').find('#genera_pdf');
				
				//grid de productos
				var $grid_productos = $('#forma-cotizacions-window').find('#grid_productos');
				//grid de errores
				var $grid_warning = $('#forma-cotizacions-window').find('#div_warning_grid').find('#grid_warning');
				
				//var $flete = $('#forma-cotizacions-window').find('input[name=flete]');
				var $subtotal = $('#forma-cotizacions-window').find('input[name=subtotal]');
				var $impuesto = $('#forma-cotizacions-window').find('input[name=impuesto]');
				var $total = $('#forma-cotizacions-window').find('input[name=total]');
				
				var $cerrar_plugin = $('#forma-cotizacions-window').find('#close');
				var $cancelar_plugin = $('#forma-cotizacions-window').find('#boton_cancelar');
				var $submit_actualizar = $('#forma-cotizacions-window').find('#submit');
				
				
				//$select_moneda_original.hide();
				//ocultar boton de generar pdf. Solo debe estar activo en editar
				//$boton_genera_pdf.hide();
				//$descripcion_larga.hide();
				$tr_tipo.hide();
				$no_control_cliente.attr('readonly',true);
				$razon_cliente.attr('readonly',true);
				$dir_cliente.attr('readonly',true);
				$no_control_cliente.css({'background' : '#F0F0F0'});
				$razon_cliente.css({'background' : '#F0F0F0'});
				$folio.css({'background' : '#F0F0F0'});
				$dir_cliente.css({'background' : '#F0F0F0'});
				$contactocliente.css({'background' : '#F0F0F0'});
				//$fecha.css({'background' : '#F0F0F0'});
				
				$no_control_cliente.focus();
				
				var respuestaProcesada = function(data){
					if ( data['success'] == "true" ){
						jAlert("La cotizaci&oacute;n se guard&oacute; con exito", 'Atencion!');
						var remove = function() {$(this).remove();};
						$('#forma-cotizacions-overlay').fadeOut(remove);
						$get_datos_grid();
					}else{
						// Desaparece todas las interrogaciones si es que existen
						//$('#forma-cotizacions-window').find('.div_one').css({'height':'545px'});//sin errores
						$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'600px'});//con errores
						$('#forma-cotizacions-window').find('div.interrogacion').css({'display':'none'});
						
						$grid_productos.find('#cant').css({'background' : '#ffffff'});
						$grid_productos.find('#cost').css({'background' : '#ffffff'});
						
						$('#forma-cotizacions-window').find('#div_warning_grid').css({'display':'none'});
						$('#forma-cotizacions-window').find('#div_warning_grid').find('#grid_warning').children().remove();
						
						var valor = data['success'].split('___');
						//muestra las interrogaciones
						for (var element in valor){
							tmp = data['success'].split('___')[element];
							longitud = tmp.split(':');

							if( longitud.length > 1 ){
								$('#forma-cotizacions-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
								.parent()
								.css({'display':'block'})
								.easyTooltip({tooltipId: "easyTooltip2",content: tmp.split(':')[1]});
								
								//alert(tmp.split(':')[0]);
								var campo = tmp.split(':')[0];
								var $campo_input;
								
								if((tmp.split(':')[0].substring(0, 4) == 'cant') || (tmp.split(':')[0].substring(0, 6) == 'precio')){
									$('#forma-cotizacions-window').find('#div_warning_grid').css({'display':'block'});
									$campo_input = $grid_productos.find('.'+campo).css({'background' : '#d41000'});
									
									var codigo_producto = $campo_input.parent().parent().find('input[name=sku]').val();
									var titulo_producto = $campo_input.parent().parent().find('input[name=nombre]').val();
									
									var tr_warning = '<tr>';
											tr_warning += '<td width="20"><div><IMG SRC="../../img/icono_advertencia.png" ALIGN="top" rel="warning_sku"></td>';
											tr_warning += '<td width="120"><INPUT TYPE="text" value="' + codigo_producto + '" class="borde_oculto" readOnly="true" style="width:116px; color:red"></td>';
											tr_warning += '<td width="200"><INPUT TYPE="text" value="' + titulo_producto + '" class="borde_oculto" readOnly="true" style="width:196px; color:red"></td>';
											tr_warning += '<td width="235"><INPUT TYPE="text" value="'+  tmp.split(':')[1] +'" class="borde_oculto" readOnly="true" style="width:225px; color:red"></td>';
									tr_warning += '</tr>';
									
									$('#forma-cotizacions-window').find('#div_warning_grid').find('#grid_warning').append(tr_warning);
													
								}
							}
						}
						
						$grid_warning.find('tr:odd').find('td').css({'background-color' : '#FFFFFF'});
						$grid_warning.find('tr:even').find('td').css({'background-color' : '#e7e8ea'});

						
					}
				}
				
				var options = {dataType :  'json', success : respuestaProcesada};
				$forma_selected.ajaxForm(options);
				
				//aqui se cargan los campos al editar
				$.post(input_json,$arreglo,function(entry){
					//carga select de incoterms
					$select_incoterms.children().remove();
					var incoterms_hmtl = '';
					$.each(entry['Incoterms'],function(entryIndex,incoterm){
						incoterms_hmtl += incoterm['opcion_select'];
					});
					$select_incoterms.append(incoterms_hmtl);
					
					if(entry['datosCotizacion'][0]['img_desc'] == 'true'){
						$('#forma-cotizacions-window').find('input[name=razoncliente]').css({'width':'550px'});
						$('#forma-cotizacions-window').find('input[name=dircliente]').css({'width':'550px'});
						$('#forma-cotizacions-window').find('input[name=contactocliente]').css({'width':'550px'});
						$('#forma-cotizacions-window').find('#td_imagen').show();
						$('#forma-cotizacions-window').find('#td_descripcion').show();
						$('#forma-cotizacions-window').find('#td1').css({'width':'740px'});
						$('#forma-cotizacions-window').find('#td2').css({'width':'460px'});
						$('#forma-cotizacions-window').find('.contenedor_grid').css({'width':'1180px'});
						$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'width':'1213px'});
						$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'width':'1213px'});
						$('#forma-cotizacions-window').find('.cotizacions_div_two').css({'width':'1213px'});
						$('#forma-cotizacions-window').find('.cotizacions_div_three').css({'width':'1203px'});
						$('#forma-cotizacions-window').css({"margin-left": -480, 	"margin-top": -230});
						$('#forma-cotizacions-window').find('#titulo_plugin').css({'width':'1173px'});
						$('#forma-cotizacions-window').find('#div_botones').css({'width':'1190px'});
						$('#forma-cotizacions-window').find('#div_botones').find('.tabla_botones').find('.td_left').css({'width':'1090px'});
						
					}else{
						
						$('#forma-cotizacions-window').find('input[name=razoncliente]').css({'width':'430px'});
						$('#forma-cotizacions-window').find('input[name=dircliente]').css({'width':'430px'});
						$('#forma-cotizacions-window').find('input[name=contactocliente]').css({'width':'430px'});
						$('#forma-cotizacions-window').find('#td_imagen').hide();
						$('#forma-cotizacions-window').find('#td_descripcion').hide();
						$('#forma-cotizacions-window').find('#td1').css({'width':'520px'});
						$('#forma-cotizacions-window').find('#td2').css({'width':'350px'});
						$('#forma-cotizacions-window').find('.contenedor_grid').css({'width':'860px'});
						$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'width':'893px'});
						$('#forma-cotizacions-window').find('.cotizacions_div_two').css({'width':'893px'});
						$('#forma-cotizacions-window').find('.cotizacions_div_three').css({'width':'880px'});
						$('#forma-cotizacions-window').css({"margin-left": -320, 	"margin-top": -230});
						$('#forma-cotizacions-window').find('#titulo_plugin').css({'width':'853px'});
						$('#forma-cotizacions-window').find('#div_botones').css({'width':'870px'});
						$('#forma-cotizacions-window').find('#div_botones').find('.tabla_botones').find('.td_left').css({'width':'770px'});
						
						
					}
					
					
					if(entry['Extras'][0]['mod_crm']=='true'){
						$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'560px'});
						$tr_tipo.show();//mostrar tr para escoger el tipo destino de la cotizacion
					}
					
					
					$aplicar_evento_click_checkbox_incluye_iva($check_incluye_iva, entry['Extras'][0]['mod_crm']);
					
					$folio.val(entry['datosCotizacion'][0]['folio']);
					$id_cotizacion.val(entry['datosCotizacion'][0]['id']);
					$observaciones.text(entry['datosCotizacion'][0]['observaciones']);
					$check_descripcion_larga.attr('checked',  (entry['datosCotizacion'][0]['img_desc'] == 'true')? true:false );
					$tc.val(entry['datosCotizacion'][0]['tipo_cambio']);
					$tc_original.val(entry['datosCotizacion'][0]['tipo_cambio']);
					$fecha.val(entry['datosCotizacion'][0]['fecha']);
					
					
					$id_cliente.val(entry['DatosCP'][0]['cliente_id']);
					$no_control_cliente.val(entry['DatosCP'][0]['numero_control']);
					$rfc_cliente.val(entry['DatosCP'][0]['rfc']);
					$razon_cliente.val(entry['DatosCP'][0]['razon_social']);
					$dir_cliente.val(entry['DatosCP'][0]['direccion']);
					$num_lista_precio.val(entry['DatosCP'][0]['lista_precio']);
					$contactocliente.val(entry['DatosCP'][0]['contacto']);
					
					$vigencia.val(entry['datosCotizacion'][0]['dias_vigencia']);
					$check_incluye_iva.attr('checked',  (entry['datosCotizacion'][0]['incluye_iva'] == 'true')? true:false );
					
					
					if(entry['datosCotizacion'][0]['incluye_iva'] == 'true'){
						$('#forma-cotizacions-window').find('.cotizacions_div_one').find('#tabla_totales').show();
						
						if(entry['Extras'][0]['mod_crm']=='true'){
							$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'560px'});
						}else{
							$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'590px'});
						}
						
					}else{
						$('#forma-cotizacions-window').find('.cotizacions_div_one').find('#tabla_totales').hide();
						if(entry['Extras'][0]['mod_crm']=='true'){
							$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'490px'});
						}else{
							$('#forma-cotizacions-window').find('.cotizacions_div_one').css({'height':'490px'});
						}
					}
					
					
					
					/*
					$subtotal.val(entry['DatosCP'][0]['subtotal']);
					$impuesto.val(entry['DatosCP'][0]['impuesto']);
					$total.val(entry['DatosCP'][0]['total']);
					*/
					$select_tipo_cotizacion.children().remove();
					var html='';
					if(parseInt(entry['datosCotizacion'][0]['tipo'])==1){
						html='<option value="1" selected="yes">Cliente</option>';
						html +='<option value="2">Prospecto</option>';
					}else{
						html='<option value="1">Cliente</option>';
						html +='<option value="2"  selected="yes">Prospecto</option>';
					}
					$select_tipo_cotizacion.append(html);
					
					
					
					
					//carga select denominacion con todas las monedas
					$select_moneda.children().remove();
					//var moneda_hmtl = '<option value="0">[--   --]</option>';
					var moneda_hmtl = '';
					var moneda_hmtl2 = '';
					$.each(entry['Monedas'],function(entryIndex,moneda){
						if(moneda['id'] == entry['datosCotizacion']['0']['moneda_id']){
							moneda_hmtl += '<option value="' + moneda['id'] + '"  selected="yes">' + moneda['descripcion'] + '</option>';
						}else{
							moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
						}
						//moneda_hmtl2 += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
					});
					$select_moneda.append(moneda_hmtl);
					//este select esta oculto, de esta se copian los elementos para el select de moneda del grid
					$select_moneda_original.append(moneda_hmtl);
					
					$id_impuesto.val(entry['iva']['0']['id_impuesto']);
					$valor_impuesto.val(entry['iva']['0']['valor_impuesto']);
					
					$busca_cliente.hide();
					
					
					//carga select de agentes
					$select_agente.children().remove();
					var agen_hmtl = '';
					$.each(entry['Agentes'],function(entryIndex,agen){
						if(agen['id'] == entry['datosCotizacion']['0']['agente_id']){
							agen_hmtl += '<option value="' + agen['id'] + '" selected="yes">' + agen['nombre_agente'] + '</option>';
						}else{
							agen_hmtl += '<option value="' + agen['id'] + '"  >' + agen['nombre_agente'] + '</option>';
						}
					});
					/*
					if (parseInt(entry['datosCotizacion']['0']['agente_id'])== 0){
						agen_hmtl += '<option value="0">[--  --]</option>';
					}
					*/
					$select_agente.append(agen_hmtl);
					
					
					if(entry['datosGrid'] != null){
						$.each(entry['datosGrid'],function(entryIndex,prod){
							var id_detalle=prod['id_detalle'];
							var id_prod = prod['producto_id'];
							var sku = prod['codigo'];
							var titulo = prod['producto'];
							var imagen = prod['archivo_img'];
							var descripcion = prod['descripcion_larga'];
							var unidad = prod['unidad'];
							var id_pres = prod['presentacion_id'];
							var pres = prod['presentacion'];
							var precio = prod['precio_unitario'];
							var cantidad = prod['cantidad'];
							var importe = prod['importe'];
							var mon_id = prod['moneda_id'];
							var idImp = prod['id_imp'];
							var valorImp = prod['valor_imp'];
							
							//aqui se pasan datos a la funcion que agrega el tr en el grid
							$agrega_producto_grid($grid_productos, id_detalle, id_prod, sku, titulo, imagen, descripcion, unidad, id_pres, pres, precio, cantidad, importe, mon_id, entry['Monedas'], idImp, valorImp);
							
						});
					}
					
					//agregar producto al grid
					$agregar_producto.click(function(event){
						event.preventDefault();
						$buscador_presentaciones_producto($rfc_cliente.val(), $sku_producto.val(),$nombre_producto,$grid_productos, entry['Monedas']);
					});
					
					//$fecha.val(mostrarFecha());
					$fecha.click(function (s){
						var a=$('div.datepicker');
						a.css({'z-index':100});
					});
					
					$fecha.DatePicker({
						format:'Y-m-d',
						date: $fecha.val(),
						current: $fecha.val(),
						starts: 1,
						position: 'bottom',
						locale: {
							days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
							daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
							daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
							months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
							monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
							weekMin: 'se'
						},
						onChange: function(formated, dates){
							var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
							$fecha.val(formated);
							if (formated.match(patron) ){
								var valida_fecha=mayor($fecha.val(),mostrarFecha());
								
								if (valida_fecha==true){
									$fecha.DatePickerHide();
								}else{
									jAlert("Fecha no valida, debe ser mayor a la actual.",'! Atencion');
									$fecha.val(mostrarFecha());
								}
							}
						}
					});
					
					
					//cambiar moneda
					$select_moneda.change(function(){
						var idMonSeleccionado = $(this).val();
						var cambiarTcOriginal='false';
						
						//si la moneda actual seleccionada es igual a la moneda original entonces permitir cambiar el tipo de cambio original
						if( parseInt($select_moneda_original.val()) == parseInt($select_moneda.val()) ){
							cambiarTcOriginal='true';
						}
						
						//ejecutar funcion al cambiar la moneda
						getTcIdMoneda(idMonSeleccionado, cambiarTcOriginal);
						
						
						//alert("select_moneda: "+$select_moneda.find('option:selected').val()+"   seleccionado:"+seleccionado);
						//cambiar la moneda de las partidas del grid al cambiar la moneda
						$grid_productos.find('select[name=monedagrid]').children().remove();
						var moneda_grid_hmtl = '';
						$.each(entry['Monedas'],function(entryIndex,moneda){
							if(parseInt(idMonSeleccionado) == parseInt(moneda['id'])){
								moneda_grid_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion_abr'] + '</option>';
							}
						});
						$grid_productos.find('select[name=monedagrid]').append(moneda_grid_hmtl);
					});
					
					//aplicar multiselect
					$select_incoterms.multiselect();
					
				});//termina llamada json
				
				//carga select de acciones
				$select_accion.children().remove();
				var accion_hmtl = '<option value="edit">Actualizar</option>';
				accion_hmtl += '<option value="new">Nuevo</option>';
				$select_accion.append(accion_hmtl);
				
				//aplicar tipo de cambio a todos los precios al cambiar valor de tipo de cambio
				$tc.blur(function(){
					if($(this).val()=='' || $(this).val()==' '){
						$(this).val(0);
					}
					
					//si la moneda actual seleccionada es igual a la moneda original entonces permitir cambiar el tipo de cambio original
					if( parseInt($select_moneda_original.val()) == parseInt($select_moneda.val()) ){
						$tc_original.val($(this).val());
					}
					
					$grid_productos.find('tr').each(function (index){
						var precio_cambiado=0;
						var importe_cambiado=0;
						
						if($(this).find('#cost').val()!=' ' && $(this).find('#cost').val()!=''){
							//si la moneda inicial de la cotizacion es diferente a la moneda actual seleccionada
							//entonces recalculamos los precios de acuerdo al tipo de cambio
							if( parseInt($select_moneda_original.val()) != parseInt($select_moneda.val()) ){
								
								if(parseInt($select_moneda_original.val())==1 && parseInt($select_moneda.val())!=1){
									//si la moneda original es pesos, calculamos su equivalente a dolares
									precio_cambiado = parseFloat($(this).find('#precor').val()) / parseFloat($tc.val());
								}
								
								if(parseInt($select_moneda_original.val())!=1 && parseInt($select_moneda.val())==1){
									//si la moneda original es dolar, calculamos su equivalente a pesos
									precio_cambiado = parseFloat($(this).find('#precor').val()) * parseFloat($tc_original.val());
								}
								
								$(this).find('#cost').val(parseFloat(precio_cambiado).toFixed(4));
								
								importe_cambiado = parseFloat($(this).find('#cant').val()) * parseFloat($(this).find('#cost').val());
								$(this).find('#import').val(parseFloat(importe_cambiado).toFixed(4));
								
							}else{
								//aqui no se cambia porque es la misma moneda en la que se hizo la cotizacion, asi que no se aplica tipo de cambio
							}
						}
					});
					$recalcula_totales();//llamada a la funcion que calcula totales
				});
				
				
				//pone cero al perder el enfoque
				$vigencia.blur(function(e){
					if(parseFloat($vigencia.val())==0||$vigencia.val()==""){
						$vigencia.val(0);
					}
				});
				
				
				//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
				$vigencia.focus(function(e){
					if(parseFloat($vigencia.val())<1){
						$vigencia.val('');
					}
				});
				
				
				//buscador de productos
				$busca_sku.click(function(event){
					event.preventDefault();
					$busca_productos($sku_producto.val(), $nombre_producto.val());
				});
				
				
				
				//desencadena clic del href Agregar producto al pulsar enter en el campo sku del producto
				$sku_producto.keypress(function(e){
					if(e.which == 13){
						$agregar_producto.trigger('click');
						return false;
					}
				});
				
		
				//desencadena clic del href Buscar producto al pulsar enter en el campo Nombre del producto
				$nombre_producto.keypress(function(e){
					if(e.which == 13){
						$busca_sku.trigger('click');
						return false;
					}
				});
		
				
				//alert($descripcion_larga.val());
				$boton_genera_pdf.click(function(event){
					var seleccionado="false";
					var incluyeIva="false";
					
					if($check_descripcion_larga.is(':checked')){
						seleccionado="true";
					}
					
					if($check_incluye_iva.is(':checked')){
						incluyeIva="true";
					}
					
					var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
					var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/getGeneraPdfCotizacion/'+$id_cotizacion.val()+'/'+seleccionado+'/'+incluyeIva+'/'+iu+'/out.json';
					window.location.href=input_json;
				});
				
				
				$aplicar_evento_click_checkbox($check_descripcion_larga);
				
				//validar campo Tipo de Cambio, solo acepte numeros y punto
				$tc.keypress(function(e){
					// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
					if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}
				});
				
				//validar dias de vigencia
				$vigencia.keypress(function(e){
					// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
					if (e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
						return true;
					}else {
						return false;
					}		
				});
				
				
				$submit_actualizar.bind('click',function(){
					var trCount = $("tr", $grid_productos).size();
					$total_tr.val(trCount);
					if(parseInt(trCount) > 0){
						return true;                
					}else{
						jAlert("No hay datos para actualizar", 'Atencion!');
						return false;
					}
				});
				
				
				//recalcular los totales al eliminar un registro
				//$recalcula_totales();
				
				
				//Ligamos el boton cancelar al evento click para eliminar la forma
				$cancelar_plugin.bind('click',function(){
					var remove = function() {$(this).remove();};
					$('#forma-cotizacions-overlay').fadeOut(remove);
				});
				
				$cerrar_plugin.bind('click',function(){
					var remove = function() {$(this).remove();};
					$('#forma-cotizacions-overlay').fadeOut(remove);
				});
				
			}
		}
	}
        
        
        
        
    $get_datos_grid = function(){
        var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getCotizaciones.json';
		
        var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
		
        $arreglo = {'orderby':'id','desc':'DESC','items_por_pag':10,'pag_start':1,'display_pag':10,'input_json':'/'+controller+'/getCotizaciones.json', 'cadena_busqueda':$cadena_busqueda, 'iu':iu}
		
        $.post(input_json,$arreglo,function(data){
			
            //pinta_grid
            $.fn.tablaOrdenable(data,$('#lienzo_recalculable').find('.tablesorter'),carga_formaCotizacions00_for_datagrid00);
			
            //resetea elastic, despues de pintar el grid y el slider
            Elastic.reset(document.getElementById('lienzo_recalculable'));
        },"json");
    }
    
    $get_datos_grid();
    
    
});



