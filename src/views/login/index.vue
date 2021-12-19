<template>
  <div class="login-container">
    <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select"></LangSelect>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="https://res.lgdsunday.club/user.svg"></svg-icon>
        </span>
        <el-input placeholder="username" name="username" type="text" v-model="loginForm.username"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input placeholder="password" name="password" v-model="loginForm.password" :type="passwordType"></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <span class="svg-container">
            <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
          </span>
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click="handlerLogin">{{ $t('msg.login.loginBtn') }}</el-button>
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules'
import LangSelect from '@/components/LangSelect'
const i18n = useI18n()

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = ref({
  username: [{
    required: true,
    trigger: 'blur',
    message: i18n.t('msg.login.usernameRule')
  }],
  password: [{
    required: true,
    trigger: 'blur',
    validator: validatePassword()
  }]
})
// 处理密码框
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 处理登录
const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handlerLogin = () => {
  // 1.进行表单校验
  console.log(loginFormRef.value)
  loginFormRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    loading.value = true
    // 2.登录
    store.dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
      })
      .catch(err => {
        loading.value = false
        console.log(err)
      })

    // 3.登录后的处理
  })
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;
	.login-form {
		position: relative;
		width: 520px;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
		margin-top: 200px;
	}
	::v-deep .el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
	::v-deep .el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;
		}
	}
	.tips {
		font-size: 16px;
		color: white;
		line-height: 24px;
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
	::v-deep .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
	}
}
</style>
