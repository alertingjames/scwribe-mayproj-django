"""mayproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from may import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^may/', include('may.urls')),
    url(r'^$', views.index, name='index'),
    url(r'^tocomlogin', views.tocomlogin, name='tocomlogin'),
    url(r'^tologin', views.tologin, name='tologin'),
    url(r'^tosignup', views.tosignup, name='tosignup'),
    url(r'^torequestpwd', views.torequestpwd, name='torequestpwd'),
    url(r'^toterms', views.toterms, name='toterms'),
    url(r'^terms2', views.terms2, name='terms2'),
    url(r'^welcome', views.welcome, name='welcome'),
    url(r'^home', views.home, name='home'),
    url(r'^logout', views.logout, name='logout'),
    url(r'^termsdone', views.termsdone, name='termsdone'),
    url(r'^login_user', views.login_user, name='login_user'),
    url(r'^login_comuser', views.login_comuser, name='login_comuser'),
    url(r'^myprofile', views.myprofile, name='myprofile'),
    url(r'^profile', views.profile, name='profile'),
    url(r'^toadminsignup', views.toadminsignup, name='toadminsignup'),
    url(r'^manager', views.toadminlogin, name='toadminlogin'),
    url(r'^adminsignup', views.adminsignup, name='adminsignup'),
    url(r'^adminhome', views.adminhome, name='adminhome'),
    url(r'^addmember', views.addmember, name='addmember'),
    url(r'^deletemember', views.deletemember, name='deletemember'),
    url(r'^editbox/(?P<member_id>[0-9]+)/$', views.editbox, name='editbox'),
    url(r'^updatemember/(?P<member_id>[0-9]+)/$', views.updatemember, name='updatemember'),
    url(r'^updateadmin/(?P<admin_id>[0-9]+)/$', views.updateadmin, name='updateadmin'),
    url(r'^searchcomuser', views.searchcomuser, name='searchcomuser'),
    url(r'^addbox', views.addbox, name='addbox'),
    url(r'^export_xlsx_member', views.export_xlsx_member, name='export_xlsx_member'),
    url(r'^import_view_member', views.import_view_member, name='import_view_member'),
    url(r'^import_member_data', views.import_member_data, name='import_member_data'),
    url(r'^meet/(?P<user_id>[0-9]+)/$', views.meet, name='meet'),
    url(r'^users', views.users, name='users'),
    url(r'^groups', views.allgroups, name='allgroups'),
    url(r'^addgroupbox', views.addgroupbox, name='addgroupbox'),
    url(r'^creategroup', views.creategroup, name='creategroup'),
    url(r'^mygroups', views.mygroups, name='mygroups'),
    url(r'^editgroupbox/(?P<group_id>[0-9]+)/$', views.editgroupbox, name='editgroupbox'),
    url(r'^updategroup/(?P<group_id>[0-9]+)', views.updategroup, name='updategroup'),
    url(r'^deletegroup/(?P<group_id>[0-9]+)', views.deletegroup, name='deletegroup'),
    url(r'^meetgroup/(?P<group_id>[0-9]+)/$', views.meetgroup, name='meetgroup'),
    url(r'^transcript/(?P<param>[0-9]+)', views.transcript, name='transcript'),
    url(r'^transcripts/(?P<user_id>[0-9]+)', views.transcripts, name='transcripts'),
    url(r'^deletenote/(?P<user_id>[0-9]+)', views.deletenote, name='deletenote'),
    url(r'^notedetail/(?P<note_id>[0-9]+)/(?P<user_id>[0-9]+)', views.notedetail, name='notedetail'),
    url(r'^transcriptdetail/(?P<note_id>[0-9]+)', views.transcriptdetail, name='transcriptdetail'),
    url(r'^grouptranscript/(?P<param>[0-9]+)', views.grouptranscript, name='grouptranscript'),
    url(r'^allnotes', views.allnotes, name='allnotes'),
    url(r'^searchnotes', views.searchnotes, name='searchnotes'),
    url(r'^schmynotes/(?P<user_id>[0-9]+)', views.schmynotes, name='schmynotes'),
    url(r'^schusers', views.schusers, name='schusers'),
    url(r'^schgroups', views.schgroups, name='schgroups'),
    url(r'^schallgroups', views.schallgroups, name='schallgroups'),
    url(r'^invitetogroup', views.invitetogroup, name='invitetogroup'),
    url(r'^userinvite', views.userinvite, name='userinvite'),
    url(r'^get_notifications', views.get_notifications, name='get_notifications'),
    url(r'^chat_page/(?P<user_id>[0-9]+)/$', views.chat_page, name='chat_page'),
    url(r'^calllogin', views.calllogin, name='calllogin'),
    url(r'^createTalkingLink', views.createTalkingLink, name='createTalkingLink'),
    url(r'^createTalkingRoom', views.createTalkingRoom, name='createTalkingRoom'),
    url(r'^forgotpassword', views.forgotpassword, name='forgotpassword'),
    url(r'^resetpassword/$', views.resetpassword, name='resetpassword'),
    url(r'^rstpwd', views.rstpwd, name='rstpwd'),
    url(r'^call', views.call, name='call'),
    url(r'^video_call', views.video_call, name='video_call'),
    url(r'^groupvideocall', views.groupvideocall, name='groupvideocall'),
]


urlpatterns+=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns=format_suffix_patterns(urlpatterns)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)