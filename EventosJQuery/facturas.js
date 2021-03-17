$(document).on('click', '#agregarLinea', function () {

    $valorProducto = $("#producto").val();
    $valorCantidad = $("#cantidad").val();
    $valorPrecioUnitario = $("[id = 'precio unitario']").val();
    $valorDescuento = $("#descuento").val();
    $total = $("#total").val();

    $("tbody").append("<tr class='info'>"
        + "<td> " + $valorProducto + " </td>"
        + "<td class='valorCantidad'> " + $valorCantidad + " </td>"
        + "<td class='valorPrecioUnitario'> " + $valorPrecioUnitario + " </td>"
        + "<td class='valorDescuento'> " + $valorDescuento + " </td>"
        + "<td class='valorTotal'> " + $total + " </td>"
        + "<td> <button type'button' class='borrar btn-success'> Borrar </button>"
        + "</tr>"
    );

    $refreshAmount = parseInt($("#base-imponible").text()) + parseInt($total);
    $("#base-imponible").text($refreshAmount);
    $iva = ($refreshAmount * 1.21) - $refreshAmount;
    $("#iva").text($iva);
    $totalFact = $refreshAmount + $iva;
    $("span#total").text($totalFact);

    var dt = new Date();
    var time = "Product: " + $valorProducto + " added @ " + dt.getUTCDate() + "/" + (dt.getUTCMonth() + 1) + "/" + dt.getUTCFullYear() + " | " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $(".container").append("<p>" + time + "</p>");
   

});

$(document).on('mouseout', "#descuento", function () {

    $valorCantidad = $("#cantidad").val();
    $valorPrecioUnitario = $("[id = 'precio unitario']").val();
    $valorDescuento = $("#descuento").val();

    $("#total").val($valorCantidad * $valorPrecioUnitario * (1 - $valorDescuento / 100));

});

$(document).on('mouseout', "#cantidad, [id = 'precio unitario']", function () {

    $valorCantidad = $("#cantidad").val();
    $valorPrecioUnitario = $("[id = 'precio unitario']").val();
    $valorDescuento = $("#descuento").val();

    $("#total").val($valorCantidad * $valorPrecioUnitario);

});

$(document).on('click', ".borrar", function () {

    $value = $(this).parent().siblings(".valorTotal").text();

    $refreshAmount = parseInt($("#base-imponible").text()) - parseInt($value);
    $("#base-imponible").text($refreshAmount);
    $iva = ($refreshAmount * 1.21) - $refreshAmount;
    $("#iva").text($iva);
    $totalFact = $refreshAmount + $iva;
    $("span#total").text($totalFact);

    $(this).parent().parent().remove();

});

$(document).on('click', "#aplicarDescuento", function () {

    $descuentoLineas = $("#descuento-lineas").val();
    $(".valorDescuento").text($descuentoLineas);
   
   
        $(".info").each(function () {
            $valorCantidad = $(this).find(".valorCantidad").text();
            $valorPrecioUnitario = $(this).find(".valorPrecioUnitario").text();
            $valorTotal = parseInt($valorCantidad) * parseInt($valorPrecioUnitario) * (1 - parseInt($descuentoLineas) / 100);
            $(this).children('.valorTotal').text($valorTotal);
        });

    $refreshAmount = 0;
    $iva = 0;
    $('.valorTotal').each(function () {
        $parse = parseInt($(this).text());
        $refreshAmount += $parse;
        $("#base-imponible").text($refreshAmount);
        
    });
    $iva = ($refreshAmount * 1.21) - $refreshAmount;
    $("#iva").text($iva);
    $totalFact = $refreshAmount + $iva;
    $("span#total").text($totalFact);
    

});

