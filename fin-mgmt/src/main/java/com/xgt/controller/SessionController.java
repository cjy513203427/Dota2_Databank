package com.xgt.controller;

import com.xgt.common.BaseController;
import com.xgt.common.PcsResult;

import org.apache.commons.collections4.map.HashedMap;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.Map;

/**
 * Author: CC
 * Date: 2016/8/29
 * Desc:
 */
@RequiresPermissions(value = "session:*")
@Controller
@Path("/session")
public class SessionController extends BaseController {
    @Autowired
    private SessionDAO sessionDAO;

    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public PcsResult sessionList() {
        Collection<Session> sessions=sessionDAO.getActiveSessions();
        Map map=new HashedMap();
        map.put("list",sessions);
        return newResult().setData(map);
    }

}