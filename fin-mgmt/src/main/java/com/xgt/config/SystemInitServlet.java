package com.xgt.config;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * copyright © 2008-2016 CTIM. All Right Reserved.
 * Created by cC on 2016/8/25.
 * Desc:
 */
public class SystemInitServlet extends HttpServlet{
    private static final long serialVersionUID = -8082982326078915362L;



    /*
	 *
	 */
    public SystemInitServlet() {
        super();
    }

    /*
     * (non-Javadoc)
     *
     * @see javax.servlet.GenericServlet#destroy()
     */
    public void destroy() {
        super.destroy();
    }

    /*
     * (non-Javadoc)
     *
     * @see javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest,
     *      javax.servlet.http.HttpServletResponse)
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /*
     * (non-Javadoc)
     *
     * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest,
     *      javax.servlet.http.HttpServletResponse)
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /**
     * init for servlet
     *
     * get initialization
     *
     * @throws ServletException
     */
    public void init(ServletConfig servletConfig) throws ServletException {
        super.init(servletConfig);
        ServletContext sc = this.getServletContext();
    }
}
