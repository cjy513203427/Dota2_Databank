package com.xgt.dao.entity.dota;

/**
 * Created by hasee on 2018/5/3.
 */
public class SteamAccount {
    private Integer id;
    //The user's 64 bit ID
    private Long steamid;
    /**
      An integer that describes the access setting of the profile

     1
     Private
     2
     Friends only
     3
     Friends of Friends[1]
     4
     Users Only
     5
     Public
     *
     */
    private Integer communityvisibilitystate;
    //User's display name.
    private String personaname;
    //A unix timestamp of when the user was last online.
    private Long lastlogoff;
    //The URL to the user's Steam Community profile.
    private String profileurl;
    //A 32x32 image
    private String avatar;
    //A 64x64 image
    private String avatarmedium;
    //A 184x184 image
    private String avatarfull;
    /**
     *
     The user's status

     0
     Offline (Also set when the profile is Private)
     1
     Online
     2
     Busy
     3
     Away
     4
     Snooze
     5
     Looking to trade
     6
     Looking to play
     */
    private Integer personastate;
    //The 64 bit ID of the user's primary group.
    private Long primaryclanid;
    //A unix timestamp of the date the profile was created.
    private Long timecreated;

    private String string_timecreated;

    private Integer personastateflags;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getSteamid() {
        return steamid;
    }

    public void setSteamid(Long steamid) {
        this.steamid = steamid;
    }

    public Integer getCommunityvisibilitystate() {
        return communityvisibilitystate;
    }

    public void setCommunityvisibilitystate(Integer communityvisibilitystate) {
        this.communityvisibilitystate = communityvisibilitystate;
    }

    public String getPersonaname() {
        return personaname;
    }

    public void setPersonaname(String personaname) {
        this.personaname = personaname;
    }

    public Long getLastlogoff() {
        return lastlogoff;
    }

    public void setLastlogoff(Long lastlogoff) {
        this.lastlogoff = lastlogoff;
    }

    public String getProfileurl() {
        return profileurl;
    }

    public void setProfileurl(String profileurl) {
        this.profileurl = profileurl;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAvatarmedium() {
        return avatarmedium;
    }

    public void setAvatarmedium(String avatarmedium) {
        this.avatarmedium = avatarmedium;
    }

    public String getAvatarfull() {
        return avatarfull;
    }

    public void setAvatarfull(String avatarfull) {
        this.avatarfull = avatarfull;
    }

    public Integer getPersonastate() {
        return personastate;
    }

    public void setPersonastate(Integer personastate) {
        this.personastate = personastate;
    }

    public Long getPrimaryclanid() {
        return primaryclanid;
    }

    public void setPrimaryclanid(Long primaryclanid) {
        this.primaryclanid = primaryclanid;
    }

    public Long getTimecreated() {
        return timecreated;
    }

    public void setTimecreated(Long timecreated) {
        this.timecreated = timecreated;
    }

    public Integer getPersonastateflags() {
        return personastateflags;
    }

    public void setPersonastateflags(Integer personastateflags) {
        this.personastateflags = personastateflags;
    }

    public String getString_timecreated() {
        return string_timecreated;
    }

    public void setString_timecreated(String string_timecreated) {
        this.string_timecreated = string_timecreated;
    }
}
