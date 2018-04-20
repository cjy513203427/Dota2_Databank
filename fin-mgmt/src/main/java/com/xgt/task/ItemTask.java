package com.xgt.task;

import com.xgt.bean.dota.ItemBean;
import com.xgt.common.BaseController;
import com.xgt.dao.entity.dota.Item;
import com.xgt.dao.entity.dota.LinkTypeData;
import com.xgt.dao.entity.dota.Rule;
import com.xgt.service.dota.ExtractService;
import com.xgt.service.dota.ItemService;
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
 * Created by hasee on 2017/12/4.
 */
@Component//当组件不好归类的时候，我们可以使用这个注解进行标注。
@Configurable//自动注入bean
@EnableScheduling//开启计划任务的支持。
public class ItemTask extends BaseController{
    @Autowired
    private ItemService itemService;
    //@Scheduled(cron = "0/5 * * * * ?")//每5秒执行
    @Scheduled(cron = "0 0 0 * * ?")//每天零点执行
    private void addGameItemFromSteamAPI() throws IOException {
        String jsonArray = URLUtil.getUrlForItem("https://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1/?key="+steamKey+"&language=Chinese");
        List<Item> items = GsonUtil.getObjectList(jsonArray,Item.class);
        for (Item item:items){
            ItemBean itemBean = new ItemBean();
            itemBean.setId(item.getId());
            itemBean.setName(item.getName());
            itemBean.setCost(item.getCost());
            itemBean.setSecretShop(item.getSecretShop());
            itemBean.setSideShop(item.getSideShop());
            itemBean.setRecipe(item.getRecipe());
            itemBean.setLocalizedName(item.getLocalizedName());
            itemService.addGameItemFromSteamAPI(itemBean);
        }

    }

    @Autowired
    private ExtractService extractService;
    //@Scheduled(cron = "0/5 * * * * ?")//每5秒执行
    @Scheduled(cron = "0 0 1 * * ?")//每天一点执行
    private void addHeroIconFromDOTA2OfficalWebsite() throws IOException {
        Rule rule = new Rule("http://www.dota2.com.cn/items/index.htm",
                new String[] { }, new String[] {  },
                null, -1, Rule.GET);
        List<LinkTypeData> extracts = extractService.extract(rule,"img","src");
        for (LinkTypeData linkTypeData:extracts) {
            if (linkTypeData.getImgSrc().indexOf("itemcat") == -1) {
                String iconPath = linkTypeData.getImgSrc();
                String iconPathSubStr = iconPath.substring(1);
                String name = iconPathSubStr.substring(iconPathSubStr.lastIndexOf("/") + 1, iconPathSubStr.lastIndexOf("_"));
                StringBuffer sb = new StringBuffer(iconPathSubStr);
                sb.insert(7,"/items");
                Integer id = itemService.gainIdFromItemByName(name);
                ItemBean itemBean = new ItemBean();
                itemBean.setId(id);
                itemBean.setItemPath("http://cdn.dota2.com/apps/dota2"+sb+"?3");
                itemService.addItemPathFromDOTA2OfficalWebsite(itemBean);
                System.out.println(linkTypeData.getImgSrc());
                System.out.println("***********************************");
            }
        }

    }

}
