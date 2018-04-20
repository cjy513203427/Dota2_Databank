package com.xgt.task;

import com.xgt.bean.dota.TalentBean;
import com.xgt.dao.entity.dota.LinkTypeData;
import com.xgt.dao.entity.dota.Rule;
import com.xgt.service.dota.ExtractService;
import com.xgt.service.dota.TalentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by hasee on 2017/12/18.
 */
@Component//当组件不好归类的时候，我们可以使用这个注解进行标注。
@Configurable//自动注入bean
@EnableScheduling//开启计划任务的支持。
public class TalentTask {
    @Autowired
    private TalentService talentService;
    @Autowired
    private ExtractService extractService;
    /*@Scheduled(cron = "0/5 * * * * ?")//每5秒执行
    //@Scheduled(cron = "0 0 0 * * ?")//每天零点执行
    private void addTalentFromUUU9(){
        Rule rule = new Rule("http://dota2.uuu9.com/201612/534793.shtml",
                new String[] { }, new String[] {  },
                null, -1, Rule.GET);
        List<LinkTypeData> extracts = extractService.extract(rule,"p","src");
        for(int i=21;i<extracts.size();i++){
            if(extracts.get(i).getLinkText().indexOf("级：")!=-1) {
                System.out.println(extracts.get(i).getLinkText());
                TalentBean talentBean = new TalentBean();
                talentBean.setText(extracts.get(i).getLinkText());
                talentService.addTalentFromUUU9(talentBean);
            }
        }
    }*/


    //@Scheduled(cron = "0/5 * * * * ?")//每5秒执行
    //@Scheduled(cron = "0 0 0 * * ?")//每天零点执行
    private void addTalentFromDotafire(){
        Rule rule = new Rule("https://www.dotafire.com/dota-2/talents",
                new String[] { }, new String[] {  },
                 null, -1, Rule.GET);
        //List<LinkTypeData> extracts1 = extractService.extract(rule,"img","src");
        List<LinkTypeData> extracts = extractService.extract(rule,"a","href");
        for(int i=16;i<extracts.size()-145;i+=2){
            //System.out.println(extracts.get(i).getLinkText()+"--"+extracts.get(i).getImgSrc());
            TalentBean talentBean = new TalentBean();
            talentBean.setText(extracts.get(i).getLinkText());
            /**
             * 对抓取的imgSRC进行处理，抽取出英雄名称name
             */
            String nameFromExtracts = extracts.get(i).getImgSrc();
            String subStringName = nameFromExtracts.substring(nameFromExtracts.lastIndexOf("/")+1);
            //抽取倒数第三个“-”前面的内容
            int index=subStringName.lastIndexOf("-");
            index=subStringName.lastIndexOf("-", index-1);
            index=subStringName.lastIndexOf("-",index-1);
            String name = subStringName.substring(0,index).replace("-","_");
            Integer heroId = talentService.getHeroIdFromHero(name);
            if(heroId==null||heroId.equals("")){
                System.out.println(extracts.get(i).getLinkText()+"--"+name);
            }
            talentBean.setHeroId(heroId);
            //获取天赋等级和类型
            String gradeTypeString = subStringName.substring(index+1);
            String grade = gradeTypeString.substring(0,gradeTypeString.indexOf("-"));
            String type = gradeTypeString.substring(gradeTypeString.indexOf("-")+1,gradeTypeString.lastIndexOf("-"));
            talentBean.setGrade(Integer.parseInt(grade));
            talentBean.setType(Integer.parseInt(type));
            talentService.addTalentFromDotafire(talentBean);
        }
        /*for(int i=9;i<extracts1.size()-15;i+=8){
            System.out.println(extracts1.get(i).getImgSrc());

            String name = extracts1.get(i).getImgSrc().substring(21,extracts1.get(i).getImgSrc().lastIndexOf("."));
            Integer heroId = talentService.getHeroIdFromHero(name);
        }*/
    }
}
