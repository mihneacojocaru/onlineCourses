import Cookies from "js-cookie";

export default class Data {

  api(path, method = "GET", body = null, requiresAuth=false, token=null) {
    
    const options = {
      method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      mode: "cors",
    };

    if (body != null) {
      options.body = JSON.stringify(body);
    }

    if(requiresAuth){
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(path, options);
  }

  //+++ GET

  async getCourses() {
    try {
      const response = await this.api("/api/v1/courses");
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject("error");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getOneCourse(id) {
    try {
      const resp = await this.api(`/api/v1/courses/${id}`);
      if (resp.status === 200) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getDetails(id) {
    try {
      const response = await this.api(
        `/api/v1/courseDetails/${id}`
      );
      if (response.status === 200) {
        return response.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //+++ PUT

  async updateCourseDetails(id, body, token) {
    try {
      const resp = await this.api(
        `/api/v1/courseDetails/${id}`,
        "PUT",
        body,
        true,
        token
      );
      if (resp.status === 200) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async updateCourse(id, body, token) {
    try {
      const resp = await this.api(
        `/api/v1/courses/${id}`,
        "PUT",
        body,
        true,
        token
      );
      if (resp.status === 200) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //+++

  async newCourse(body, token) {
    try {
      const resp = await this.api(
        "/api/v1/courses",
        "POST",
        body,
        true,
        token
      );
      if (resp.status === 201) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //+++ DELETE

  async deleteCourse(id, token) {
    try {
      const resp = await this.api(
        `/api/v1/courses/${id}`,
        "DELETE",
        null,
        true,
        token
      );
      if (resp.status === 202) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //+++ Sign In

  async authentificate(body) {
    try {
      const resp = await this.api(
        "/api/v1/users/login",
        "POST",
        body
      );

      if (resp.status == 200) {
        return resp.json();
      } else {
        return "Username or Password is invalid";
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  //+++ Sign Up

  async signUp(obj){
    try {
      const resp = await this.api('/api/v1/users/','POST',obj);

      return resp.json();


    } catch (error) {
      throw new Error(error);
    }

  }

}
