import {get, post, url} from '../axios/ApiDecorator'

class Test {

  @url("/vibe-web/app_page/asset")
  @get
  testApi() {}

}

export default new Test()

