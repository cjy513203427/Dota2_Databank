package com.xgt.task;

import com.xgt.bean.dota.HeroBean;
import com.xgt.dao.entity.dota.Hero;
import com.xgt.dao.entity.dota.LinkTypeData;
import com.xgt.dao.entity.dota.Rule;
import com.xgt.service.dota.ExtractService;
import com.xgt.service.dota.HeroService;
import com.xgt.util.GsonUtil;
import com.xgt.util.URLUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

/**
 * Created by hasee on 2017/12/1.
 */
@Component//当组件不好归类的时候，我们可以使用这个注解进行标注。
@Configurable//自动注入bean
@EnableScheduling//开启计划任务的支持。
public class HeroTask {
    @Autowired
    private HeroService heroService;
    //@Scheduled(cron = "0/5 * * * * ?")//每5秒执行
    @Scheduled(cron = "0 0 0 * * ?")//每天零点执行
    private void addHeroFromSteamAPI() throws IOException {
        String jsonArray = URLUtil.getUrlForHero("https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1/?key=B914590BCC453C590109B381504042A7&format=json&language=Chinese");
        List<Hero> heroes = GsonUtil.getObjectList(jsonArray,Hero.class);
        for (Hero hero:heroes){
            HeroBean heroBean = new HeroBean();
            heroBean.setId(hero.getId());
            heroBean.setName(hero.getName());
            heroBean.setLocalizedName(hero.getLocalizedName());
            heroService.addHeroFromSteamAPI(heroBean);
        }

    }

    @Autowired
    private ExtractService extractService;
    //@Scheduled(cron = "0/5 * * * * ?")//每5秒执行
    @Scheduled(cron = "0 0 1 * * ?")//每天一点执行
    private void addHeroIconFromDOTA2OfficalWebsite() throws IOException {
        Rule rule = new Rule("http://www.dota2.com.cn/heroes/index.htm",
                new String[] { }, new String[] {  },
                null, -1, Rule.GET);
        List<LinkTypeData> extracts = extractService.extract(rule,"img","src");

        for (int i=0;i<extracts.size();i++){
            String imgSrc = extracts.get(i).getImgSrc();
            String imgSrcSubstring = imgSrc.substring(0,imgSrc.lastIndexOf("_"));
            String name = imgSrcSubstring.substring(imgSrc.lastIndexOf("/")+1,imgSrcSubstring.length());
            if(i%2!=0){
                extracts.get(i).setImgSrc("http://www.dota2.com.cn"+imgSrcSubstring+"_full.png");
                Integer id = heroService.gainIdFromHeroByName(name);
                HeroBean heroBean = new HeroBean();
                heroBean.setId(id);
                heroBean.setHeadportraitPath(extracts.get(i).getImgSrc());
                heroService.addHeadportraitPathFromDOTA2OfficalWebsite(heroBean);
                /*System.out.println(extracts.get(i).getImgSrc());
                System.out.println("***********************************");*/
            }else{
                extracts.get(i).setImgSrc("http://www.dota2.com.cn"+imgSrcSubstring+"_vert.jpg");
                Integer id = heroService.gainIdFromHeroByName(name);
                HeroBean heroBean = new HeroBean();
                heroBean.setId(id);
                heroBean.setHeroPath(extracts.get(i).getImgSrc());
                heroService.addHeroPathFromDOTA2OfficalWebsite(heroBean);
                /*System.out.println(extracts.get(i).getImgSrc());
                System.out.println("-----------------------------------");*/
            }
        }
    }
}
