<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" size="medium" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <div class="user-message">
            <div class="user-name">用户</div>
            <div class="user-department">某某部门</div>
          </div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a> -->
          <a href="#">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <a href="#">
            <el-dropdown-item divided @click.native="logout">退出登陆</el-dropdown-item>
          </a>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

.user-dropdown{
  a{
    :hover{
      background: none;
      color: $subMenuActiveText;
    }

  }
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  margin-left: 20px;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    width: 128px;
    line-height: 50px;
    margin-right: 72px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      // margin-right: 30px;
      
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        width: 100%;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          float: left;
          margin-right: 8px;
        }
        .user-message{
          // position: absolute;
          // top: 0;
          // left: 0;
          line-height: 20px;
          font-size: 14px;
          float: left;
          margin-right: 14px;
          .user-name{
            color: black;
          }
          .user-department{
            font-size: 12px;
          }
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          float: left;
          // right: -20px;
          // top: 25px;
          margin-top: 12px;
          font-size: 12px;
          color: $subMenuActiveText;
        }
      }
    }
  }
}
</style>
