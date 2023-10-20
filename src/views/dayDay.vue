<template>
  <div class="active">
    <div class="header">
      <el-button type="info" @click="dialogVisible = true"
        ><el-icon><FolderAdd /></el-icon> 新建商品</el-button
      >

      <div class="search">
        <el-input
          v-model="input"
          placeholder="请输入商品名称"
          style="height: 32px"
        />

        <span style="margin: 0 5px"
          ><el-button type="primary" @click="search"
            ><el-icon><Search /></el-icon> 搜索</el-button
          ></span
        >
        <span
          ><el-button type="info" @click="rest"
            ><el-icon><Refresh /></el-icon> 重置</el-button
          ></span
        >
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="180" align="center" />
      <el-table-column
        prop="name"
        label="商品名称"
        width="180"
        align="center"
      />

      <el-table-column label="logo" width="180" align="center" height="200">
        <template #default="scope">
          <el-image
            :src="scope.row.cover"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="轮播图一"
        width="200"
        height="200"
        align="center"
      >
        <template #default="scope">
          <el-image
            :src="scope.row.slideshow_one"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>

      <el-table-column
        prop=""
        label="轮播图二"
        width="180"
        height="200"
        align="center"
      >
        <template #default="scope">
          <el-image
            :src="scope.row.slideshow_two"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>

      <el-table-column
        prop=""
        label="轮播图三"
        width="180"
        height="200"
        align="center"
      >
        <template #default="scope">
          <el-image
            :src="scope.row.slideshow_three"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="轮播图四"
        width="180"
        height="200"
        align="center"
      >
        <template #default="scope">
          <el-image
            :src="scope.row.slideshow_four"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="180" align="center" />
      <el-table-column prop="life" label="寿命" width="180" align="center" />
      <el-table-column prop="sex" label="性别" width="180" align="center" />
      <el-table-column prop="age" label="年龄" width="180" align="center" />
      <el-table-column
        prop="vaccine"
        label="预苗针数"
        width="180"
        align="center"
      />
      <el-table-column label="价格（元）" width="180" align="center" sortable>
        <template #default="scope">
          {{ parseInt(scope.row.price).toFixed(2) + '元' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="life1"
        label="生活照一"
        width="180"
        height="200"
        align="center"
      >
        <template #default="scope">
          <el-image
            :src="scope.row.life1"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="生活照二"
        width="180"
        height="200"
        align="center"
      >
        <template #default="scope">
          <el-image
            :src="scope.row.life2"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="life3"
        label="生活照三"
        width="180"
        height="200"
        align="center"
      >
        <template #default="scope">
          <el-image
            :src="scope.row.life3"
            alt=""
            style="width: 120px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>

      <el-table-column prop="life4" label="生活照四" width="180" align="center">
        <template #default="scope">
          <el-image
            :src="scope.row.life4"
            alt=""
            style="width: 150px; height: 100px; border-radius: 5px"
            fit="cover"
            lazy
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="describes"
        label="简介"
        width="480"
        align="center"
      />
      <el-table-column
        prop="repertory"
        label="库存"
        width="180"
        align="center"
      />
      <el-table-column
        prop="activity"
        label="商品类型"
        width="180"
        align="center"
      />

      <el-table-column label="操作" width="350" fixed="right" align="center">
        <template #default="scope">
          <el-button type="success" @click="add(scope.row)"
            ><el-icon><EditPen /></el-icon> 修改库存</el-button
          >
          <el-button type="danger" @click="del(scope.row)"
            ><el-icon><DeleteFilled /></el-icon> 删除商品</el-button
          >

          <el-button @click="edit(scope.row), (dialogVisible2 = true)"
            ><el-icon><Edit /></el-icon> 编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="queryInfo.pageNum"
      v-model:page-size="queryInfo.pageSize"
      :page-sizes="[10, 20, 30]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 新建 -->
    <el-dialog
      v-model="dialogVisible"
      title="新建商品"
      width="40%"
      :before-close="handleClose"
      destroy-on-close
    >
      <div class="box">
        <ul>
          <li>
            <span>宠物名称：</span>
            <el-input v-model="newUp.name" placeholder="请输入宠物名称" />
          </li>

          <li>
            <span>宠物性别：</span>
            <el-radio-group v-model="newUp.radio1">
              <el-radio label="公" size="large" border>公</el-radio>
              <el-radio label="母" size="large" border>母</el-radio>
            </el-radio-group>
          </li>
          <li>
            <span>宠物年龄：</span>
            <el-input v-model="newUp.age" placeholder="请输入宠物年龄" />
          </li>
          <li>
            <span>宠物寿命：</span>
            <el-input v-model="newUp.life" placeholder="请输入宠物寿命" />
          </li>
          <li>
            <span>库存量：</span>
            <el-input v-model="newUp.num" placeholder="请输入库存量" />
          </li>

          <li>
            <span>宠物种类：</span>
            <el-input
              v-model="newUp.kind"
              placeholder="请输入种类如狗狗、猫猫"
            />
          </li>

          <li>
            <span>预苗针数：</span>
            <el-input v-model="newUp.vaccine" placeholder="请输入预苗针数" />
          </li>

          <li>
            <span>宠物价格：</span>
            <el-input v-model="newUp.price" placeholder="请输入宠物价格" />
          </li>

          <li>
            <span>宠物标题：</span>

            <el-input
              v-model="newUp.title"
              :rows="2"
              type="textarea"
              placeholder="Please input"
            />
          </li>

          <li>
            <span>宠物介绍：</span>

            <el-input
              v-model="newUp.describes"
              :rows="2"
              type="textarea"
              placeholder="Please input"
            />
          </li>

          <li>
            <span>上传一张封面</span>
            <el-upload
              class="upload-demo"
              drag
              :auto-upload="false"
              :on-change="handleFileChange2"
              :file-list="coverList"
              :limit="1"
              :multiple="false"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">点击或者拖动上传图片</div>
              <template #tip>
                <div class="el-upload__tip">
                  size小于500kb并且图片命名不能重复Jpg /png文件
                </div>
              </template>
            </el-upload>
          </li>

          <li>
            <span>上传四张轮播图</span>
            <el-upload
              ref="upload"
              class="upload-demo"
              name="cover"
              :auto-upload="false"
              :on-change="handleFileChange"
              :before-remove="handleFileRemove"
              :file-list="fileLists"
              drag
              multiple
              :limit="4"
            >
              <template #trigger>
                <el-button type="primary">选择图片</el-button>
              </template>

              <template #tip>
                <div class="el-upload__tip">
                  size小于500kb并且图片命名不能重复Jpg /png文件
                </div>
              </template>
            </el-upload>
          </li>

          <li>
            <span>宠物生活照</span>
            <el-upload
              :file-list="lifeList"
              class="upload-demo"
              :on-change="handleFileChange3"
              drag
              name="life"
              multiple
              :limit="4"
              :auto-upload="false"
              list-type="picture"
            >
              <el-button type="primary">选择图片</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  size小于500kb并且图片命名不能重复Jpg /png文件
                </div>
              </template>
            </el-upload>
          </li>
        </ul>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button
            type="primary"
            @click="submitUpload(), (dialogVisible = false)"
          >
            确认提交
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      v-model="dialogVisible2"
      title="编辑"
      width="80%"
      :before-close="handleClose2"
    >
      <div class="boxCont">
        <div>
          <span>编辑商品信息</span>
          <ul>
            <li>
              <span>宠物名称：</span>
              <el-input v-model="infoValue.name" placeholder="请输入宠物名称" />
            </li>

            <li>
              <span>宠物性别：</span>
              <el-radio-group v-model="infoValue.radio1">
                <el-radio label="公" size="large" border>公</el-radio>
                <el-radio label="母" size="large" border>母</el-radio>
              </el-radio-group>
            </li>
            <li>
              <span>宠物年龄：</span>
              <el-input v-model="infoValue.age" placeholder="请输入宠物年龄" />
            </li>
            <li>
              <span>宠物寿命：</span>
              <el-input v-model="infoValue.life" placeholder="请输入宠物寿命" />
            </li>
            <li>
              <span>库存量：</span>
              <el-input v-model="infoValue.num" placeholder="请输入库存量" />
            </li>

            <li>
              <span>宠物种类：</span>
              <el-input
                v-model="infoValue.kind"
                placeholder="请输入种类如狗狗、猫猫"
              />
            </li>

            <li>
              <span>预苗针数：</span>
              <el-input
                v-model="infoValue.vaccine"
                placeholder="请输入预苗针数"
              />
            </li>

            <li>
              <span>宠物价格：</span>
              <el-input
                v-model="infoValue.price"
                placeholder="请输入宠物价格"
              />
            </li>

            <li>
              <span>宠物标题：</span>

              <el-input
                v-model="infoValue.title"
                :rows="2"
                type="textarea"
                placeholder="Please input"
              />
            </li>

            <li>
              <span>宠物介绍：</span>

              <el-input
                v-model="infoValue.describes"
                :rows="2"
                type="textarea"
                placeholder="Please input"
              />
            </li>
            <el-button @click="infoChange">确认修改</el-button>
          </ul>
        </div>
        <div>
          <span>编辑商品封面</span>
          <el-upload
            class="upload-demo"
            drag
            :auto-upload="false"
            :on-change="handleFileChange2"
            :file-list="coverList"
            :limit="1"
            :multiple="false"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">点击或者拖动上传图片</div>
            <template #tip>
              <div class="el-upload__tip">
                size小于500kb并且图片命名不能重复Jpg /png文件
              </div>
            </template>
          </el-upload>
          <el-button @click="changCover">确认提交</el-button>
        </div>
        <div>
          <span>编辑商品轮播图</span>

          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            name="cover"
            :auto-upload="false"
            :on-change="handleFileChange"
            :before-remove="handleFileRemove"
            :file-list="fileLists"
            drag
            multiple
            :limit="4"
          >
            <template #trigger>
              <el-button type="primary">选择图片</el-button>
            </template>

            <template #tip>
              <div class="el-upload__tip">
                size小于500kb并且图片命名不能重复Jpg /png文件
              </div>
            </template>
          </el-upload>
          <el-button @click="changeSlid">确认提交</el-button>
        </div>
        <div>
          <span>编辑商品日常资源</span>
          <el-upload
            :file-list="lifeList"
            class="upload-demo"
            :on-change="handleFileChange3"
            drag
            name="life"
            multiple
            :limit="4"
            :auto-upload="false"
            list-type="picture"
          >
            <el-button type="primary">选择图片</el-button>
            <template #tip>
              <div class="el-upload__tip">
                size小于500kb并且图片命名不能重复Jpg /png文件
              </div>
            </template>
          </el-upload>

          <el-button @click="changeL">确认提交</el-button>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="ka(), (dialogVisible2 = false)">关闭</el-button>
          <el-button type="primary" @click="ka(), (dialogVisible2 = false)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  discountInit,
  discountRepertory,
  delDiscountShop,
  discountSearchShop
} from '@/utils/get'
import {
  log,
  discountNewUp,
  life,
  cover,
  avatar,
  discountChangeShop,
  discountChangeImg,
  discountChangeSild,
  discountChangeLife
} from '@/utils/post'

import {
  ElMessage,
  ElMessageBox,
  UploadUserFile
} from '_element-plus@2.3.8@element-plus'
const queryInfo = ref({
  pageSize: 10,
  pageNum: 1,
  total: 10
})
const input = ref()
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const newUp = ref({
  name: '',
  radio1: '',
  age: '',
  life: '',
  vaccine: '',
  price: '',
  title: '',
  describes: '',
  num: 1,
  kind: ''
})
const tableData = ref([])
const handleSizeChange = (val: number) => {
  // console.log(`${val} items per page`)
}
const handleClose2 = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭这个弹窗吗?')
    .then(() => {
      ka()
      done()
    })
    .catch(() => {
      // catch error
    })
}
const handleCurrentChange = (val: number) => {
  // console.log(`current page: ${val}`)
}
const getInit = () => {
  discountInit({
    pageNum: queryInfo.value.pageNum,
    pageSize: queryInfo.value.pageSize
  }).then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      queryInfo.value.total = res.data.total
    }
  })
}
getInit()
interface v {
  id: number
  repertory: number
  name: string
}
const add = (val: v) => {
  // console.log(val.repertory)
  ElMessageBox.prompt('填写要修改的库存数量', '增加库存', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputType: 'number'
  })
    .then(({ value }) => {
      if (parseInt(value) < val.repertory) {
        ElMessage({
          message: '库存数不能小于0',
          type: 'warning',
          duration: 700
        })
      } else {
        discountRepertory({ id: val.id, num: parseInt(value) }).then((res) => {
          if (res.data.status === 200) {
            ElMessage({ message: '修改成功', type: 'success', duration: 700 })

            log({
              username: localStorage.getItem('username'),
              log: '在活动特价商品页面对：' + val.name + '修改了库存信息'
            }).then((res) => {
              if (res.data.status === 200) {
                // console.log('记录成功')
              } else {
                // console.log('记录失败')
              }
            })
            getInit()
          }
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消'
      })
    })
}

interface d {
  id: number
  name: string
}
const del = (val: d) => {
  delDiscountShop({ id: val.id }).then((res) => {
    if (res.data.status === 200) {
      queryInfo.value.total = res.data.total
      ElMessage({ message: '删除成功', type: 'success', duration: 500 })

      log({
        username: localStorage.getItem('username'),
        log: '在活动特价商品页面对：' + val.name + '进行了删除操作'
      }).then((res) => {
        if (res.data.status === 200) {
          // console.log('记录成功')
        } else {
          // console.log('记录失败')
        }
      })
      getInit()
    } else {
      ElMessage({ message: res.data.message, type: 'warning', duration: 500 })
    }
  })
}

// cover
const coverList = ref<UploadUserFile[]>([])
const fileNameCover = ref<any>([])

const handleFileChange2 = (file: any, fileList: any) => {
  coverList.value = fileList
  // console.log(coverList.value)
}

// 。。。。。。。。。。。。。。。。。

// 上传轮播图
const fileLists = ref<UploadUserFile[]>([])
// const uploadRef = ref<UploadInstance>()
const fileName = ref<any>([])
const handleFileChange = (file: any, fileList: any) => {
  fileLists.value = fileList
  // console.log(fileLists.value)
}
const handleFileRemove = (file: any, fileList: any) => {
  fileLists.value = fileList
}

// 上传生活照
const lifeList = ref<UploadUserFile[]>([])
const lifeName = ref<any>([])

const handleFileChange3 = (file: any, fileList: any) => {
  // console.log(fileList)

  lifeList.value = fileList
  // console.log(lifeList.value)
}

// --------------------封面--------------------
const submitUpload = () => {
  const formData = new FormData()
  const form = new FormData()
  const formLife = new FormData()

  fileLists.value.forEach((file: any) => {
    fileName.value.push(file.name)

    formData.append('img', file.raw)
  })

  coverList.value.forEach((file: any) => {
    fileNameCover.value.push(file.name)

    form.append('cover', file.raw)
  })

  lifeList.value.forEach((file: any) => {
    lifeName.value.push(file.name)

    formLife.append('life', file.raw)
  })
  // console.log('提交前', formData.getAll('img'))
  formData.append('fileName', fileName.value)
  form.append('fileName', fileNameCover.value)
  formLife.append('fileName', lifeName.value)

  if (
    fileLists.value.length < 1 ||
    coverList.value.length < 1 ||
    lifeList.value.length < 1
  ) {
    ElMessage({ message: '请完善商品信息', type: 'warning', duration: 1000 })
  } else {
    avatar(formData)
      .then((res) => {
        if (res.data.status === 200) {
          // console.log('ok')
        }
      })
      .catch((err) => {
        console.log(err)
      })

    cover(form)
      .then((res) => {
        if (res.data.status === 200) {
          // console.log('ok')
        }
      })
      .catch((err) => {
        console.log(err)
      })

    life(formLife)
      .then((res) => {
        if (res.data.status === 200) {
          // console.log('ok')
        }
      })
      .catch((err) => {
        console.log(err)
      })

    // 提交信息

    const timers: any = setTimeout(() => {
      discountNewUp({
        name: newUp.value.name,
        sex: newUp.value.radio1,
        age: newUp.value.age,
        life: newUp.value.life,
        vaccine: newUp.value.vaccine,
        price: newUp.value.price,
        title: newUp.value.title,
        describe: newUp.value.describes,
        repertory: newUp.value.num,
        kind: newUp.value.kind
      })
        .then((res) => {
          if (res.data.status === 200) {
            ElMessage({
              message: '新建商品成功',
              type: 'success',
              duration: 1000
            })

            log({
              username: localStorage.getItem('username'),
              log: '在活动特价商品页面新添加了商品信息'
            }).then((res) => {
              if (res.data.status === 200) {
                // console.log('记录成功')
              } else {
                // console.log('记录失败')
              }
            })

            getInit()
          } else {
            ElMessage({
              message: '新建商品失败',
              type: 'warning',
              duration: 1000
            })
          }
        })
        .catch((err) => {
          alert(err)
        })
    }, 1000)

    setTimeout(timers)
  }
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭弹窗吗')
    .then(() => {
      ka()
      done()
    })
    .catch(() => {
      // catch error
    })
}
// 分割线-----------------------------------------------

// 点击编辑存储id信息
const infoValue = ref()
const edit = (val: object) => {
  infoValue.value = val

  // console.log(val)
}

// 修改商品基本信息
const infoChange = () => {
  discountChangeShop(infoValue.value).then((res) => {
    if (res.data.status === 200) {
      ElMessage({ message: '修改成功', type: 'success', duration: 1000 })
      log({
        username: localStorage.getItem('username'),
        log: '在商品管理页面修改了商品信息'
      }).then((res) => {
        if (res.data.status === 200) {
          // console.log('记录成功')
        } else {
          // console.log('记录失败')
        }
      })
      getInit()
    }
  })
}
// 跟换宠物封面
const changCover = () => {
  const form = new FormData()
  coverList.value.forEach((file: any) => {
    fileNameCover.value.push(file.name)

    form.append('cover', file.raw)
  })

  form.append('fileName', fileNameCover.value)

  if (coverList.value.length < 1) {
    ElMessage({
      message: '请添加png、jpg类型文件',
      type: 'warning',
      duration: 1000
    })
  }
  cover(form)
    .then((res) => {
      if (res.data.status === 200) {
        discountChangeImg({ id: infoValue.value.id }).then((res) => {
          ElMessage({
            message: '更换商品封面成功',
            type: 'success',
            duration: 1000
          })
          log({
            username: localStorage.getItem('username'),
            log: '在特价商品管理页面更换了商品封面'
          }).then((res) => {
            if (res.data.status === 200) {
              // console.log('记录成功')
            } else {
              // console.log('记录失败')
            }
          })
          getInit()
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 更换宠物轮播图
const changeSlid = () => {
  // changeSild
  const formData = new FormData()
  fileLists.value.forEach((file: any) => {
    fileName.value.push(file.name)

    formData.append('img', file.raw)
  })

  // console.log('提交前', formData.getAll('img'))
  formData.append('fileName', fileName.value)

  if (fileLists.value.length < 1) {
    ElMessage({
      message: '请添加png、jpg类型文件',
      type: 'warning',
      duration: 1000
    })
  } else {
    avatar(formData)
      .then((res) => {
        if (res.data.status === 200) {
          discountChangeSild({ id: infoValue.value.id }).then((res) => {
            if (res.data.status === 200) {
              ElMessage({
                message: '更换商品轮播图成功',
                type: 'success',
                duration: 1000
              })
              log({
                username: localStorage.getItem('username'),
                log: '在特价商品管理页面更换了商品轮播图'
              }).then((res) => {
                if (res.data.status === 200) {
                  // console.log('记录成功')
                } else {
                  // console.log('记录失败')
                }
              })
              getInit()
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// 更换宠物日常图
const changeL = () => {
  const formLife = new FormData()
  lifeList.value.forEach((file: any) => {
    lifeName.value.push(file.name)

    formLife.append('life', file.raw)
  })
  // console.log('提交前', formData.getAll('img'))

  formLife.append('fileName', lifeName.value)

  if (lifeList.value.length < 1) {
    ElMessage({
      message: '请添加png、jpg类型文件',
      type: 'warning',
      duration: 1000
    })
  } else {
    life(formLife)
      .then((res) => {
        if (res.data.status === 200) {
          discountChangeLife({ id: infoValue.value.id }).then((res) => {
            if (res.data.status === 200) {
              // console.log(res)

              ElMessage({
                message: '更换商品日常照成功',
                type: 'success',
                duration: 1000
              })
              log({
                username: localStorage.getItem('username'),
                log: '在特价商品管理页面更换了商品日常照'
              }).then((res) => {
                if (res.data.status === 200) {
                  // console.log('记录成功')
                } else {
                  // console.log('记录失败')
                }
              })
              getInit()
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
// 关闭编辑页面并清除所有记录
const ka = () => {
  lifeList.value.length = 0
  fileLists.value.length = 0
  coverList.value.length = 0
  getInit()
}

const search = () => {
  discountSearchShop({ name: input.value }).then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      log({
        username: localStorage.getItem('username'),
        log: '在特价商品页面进行了搜索操作'
      }).then((res) => {
        if (res.data.status === 200) {
          // console.log('记录成功')
        } else {
          // console.log('记录失败')
        }
      })
    }
  })
}

const rest = () => {
  getInit()
}
</script>

<style scoped lang="less">
.active {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .header {
    display: flex;
    width: 100%;
    height: 150px;

    justify-content: space-around;
    align-items: center;

    .search {
      display: flex;
    }
  }
  img {
    height: 100%;
    width: 100%;
  }
  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
  .demo-pagination-block .demonstration {
    margin-bottom: 16px;
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  .box {
    display: flex;
    ul {
      list-style: none;
      li {
        margin: 15px 0;
      }
    }
  }

  .boxCont {
    display: flex;
    justify-content: space-between;
  }
}
</style>
