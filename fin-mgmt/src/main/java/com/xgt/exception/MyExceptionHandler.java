package com.xgt.exception;

import com.xgt.common.PcsResult;
import org.apache.shiro.authz.UnauthorizedException;
import org.jboss.resteasy.spi.DefaultOptionsMethodException;
import org.springframework.stereotype.Component;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * copyright © 2008-2016 CTIM. All Right Reserved.
 * Created by jonnyLee on 2016/8/23.
 * Desc:
 */
@Provider
@Component
public class MyExceptionHandler implements ExceptionMapper<Exception> {


    @Override
    public Response toResponse(Exception exception) {
        if (exception instanceof DefaultOptionsMethodException) {
            return Response.status(Response.Status.OK).build();
        }
        exception.printStackTrace();
        PcsResult pcsResult;
        if (exception instanceof PcsRunTimeException) {
            PcsRunTimeException pcsRunTimeException = (PcsRunTimeException) exception;
            pcsResult = new PcsResult(pcsRunTimeException.getError(), pcsRunTimeException.getDescription());
        } else if (exception instanceof NumberFormatException) {
            pcsResult = new PcsResult(EnumPcsServiceError.PARAM_INVALID);
        }  else if (exception instanceof UnauthorizedException){
            pcsResult = new PcsResult(EnumPcsServiceError.ACCESS_UNAUTHORIZED);
        }  else if (exception instanceof IllegalArgumentException){
            pcsResult = new PcsResult(EnumPcsServiceError.PARAM_INVALID,exception.getMessage());
        }  else {
            pcsResult = new PcsResult(EnumPcsServiceError.ERROR_SERVER);
            pcsResult.setMessage(exception.getMessage());
        }
        return Response.status(Response.Status.OK).entity(pcsResult).type("application/json").build();
    }
}
