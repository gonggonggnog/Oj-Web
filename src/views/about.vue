<template>
  <div style="display: flex;height: 100%">
    <el-card class="about-card">
      <el-row>
        <img src="../assets/images/my.jpg" alt="/" class="avator">
      </el-row>
      <br>
      <div style="text-align: center"><b>怵.</b></div>
      <el-divider content-position="right" border-style="dashed"></el-divider>
      <a href="https://www.github.com/gonggonggnog" target="_blank"><img src="../assets/images/github.jpg"
                                                                         class="github"></a>
      <el-divider content-position="right" border-style="dashed"></el-divider>
      <el-col style="display: flex">
        <el-descriptions column="1" style="width: 100%;z-index: 1">
          <el-descriptions-item label="RESIDENCE">
            <el-tag type="success" style="text-align: right">MARS</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="CITY">
            <el-tag type="success" style="text-align: right">AN QING</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="AGE">
            <el-tag type="success" style="text-align: right">21</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <a href="mailto:405351435@qq.com">
          <el-button type="primary" round :icon="Message" class="MessageButton" color="#C0CA33">
            联系我
          </el-button>
        </a>
      </el-col>
    </el-card>
    <el-card style="width: 70%;margin-top: 30px;height: 90%;margin-left: 20px;border-radius: 10px">
      <el-card>
        <el-text tag="i">
          如果一切，都是镜花水月， 那就让这万物走向终结； 如果一切，尽是虚与委蛇， 那就让这世界消失殆尽；
          <el-text tag="sub" size="small" style="margin-left: 20px"> - - - -终焉之歌.</el-text>
        </el-text>
      </el-card>
      <br>
      <el-divider content-position="left" border-style="dashed"><h1>作者</h1></el-divider>
      <br>
      <el-card>
        <b>
          大家好，我是金刚，但你也可以叫我“未来发明家”。我是一个时空穿越者，日常工作就是拯救过去、改变未来。
          我有一台能够穿越时空的超级时光机，它能让我体验不同年代的文化和历史，也能改变历史进程。
          我是一名全栈开发工程师，精通编程语言、量子计算和机器学习，而且我发明了一种可以让你学会任何技能的“大脑上传器”。
          我的休闲爱好包括与哆啦A梦玩耍，他总是带我去未来体验新的科技。
          在闲暇时，我还是一位热衷于太空探索的宇航员，曾经在火星和木星的环境中生存过一段时间。
          我相信未来充满无限可能性，我希望通过我的发明和冒险来创造一个更美好的明天！
        </b>
      </el-card>
      <br>
      <el-divider content-position="left" border-style="dashed"><h1>隐私权及评论</h1></el-divider>
      <br>
      <el-card>
        本网站<el-text tag="mark">不会</el-text>，且<el-text tag="mark">不要求</el-text>（比如真实姓名、身份证号码、手机号等），
        因而也不存在任何隐私泄漏问题。访客参与评论， 必须遵守法律法规和基本道德规范，文明礼貌。严禁发布任何有关淫秽、反动、暴力、博彩、恐吓、低
        俗的内容或违法信息，在尊重言论自由的同时请保持 和平与理性。请勿对他人采取不友好的评论或其它过激行为。
      </el-card>
    </el-card>
  </div>

</template>
<script setup>
import {onMounted} from "vue";
import {Message} from "@element-plus/icons-vue";


const ImageUrl = () => {
  return new URL(`../assets/images/my.jpg`, import.meta.url).href
}
</script>
<style>
.avator {
  width: 50%;
  height: 50%;
  border-radius: 100%;
  margin-left: 25%;
}

.MessageButton {
  z-index: 9;
  margin-top: 40%;
  color: white;
}

.about-card {
  margin-top: 50px;
  width: 25%;
  height: 85%;
  border-radius: 10px;
  margin-left: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

.github {
  width: 20%;
  height: 20%;
  margin-left: 40%;
}
</style>