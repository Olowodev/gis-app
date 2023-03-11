import './App.css';
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEffect, useRef } from 'react';
import { latLngToVector3, ThreeJSOverlayView } from '@googlemaps/three';
// import mapboxgl from 'mapbox-gl';
// import { latLngToVector3, ThreeJSOverlayView } from '@googlemaps/three';
import { Wrapper } from '@googlemaps/react-wrapper';
import {OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function WrapperComponent() {
    const ref = useRef()
  // mapboxgl.accessToken = 'pk.eyJ1Ijoib2xvd29hIiwiYSI6ImNsZjNyMndhcTBnNm8zcm50cmFkZzI1NXAifQ.sUHuNAw9DIe1ATZcaV_ETg'


  useEffect(() => {
    // const secondOne = []
    // const map = new mapboxgl.Map({
    //   container: ref.current,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   zoom: 18,
    //   center: [5.38764, 52.15616],
    //   pitch: 60,
    //   antialias: true
    // })

    // const modelOrigin = [5.38764, 52.15616]
    // const modelAltitude = 3
    // const modelRotate = [Math.PI / 2, 0, 0]

    // const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    //   modelOrigin,
    //   modelAltitude
    // )

    // const modelTransform = {
    //   translateX: modelAsMercatorCoordinate.x,
    //   translateY: modelAsMercatorCoordinate.y,
    //   translateZ: modelAsMercatorCoordinate.z,
    //   rotateX: modelRotate[0],
    //   rotateY: modelRotate[1],
    //   rotateZ: modelRotate[2],
    //   scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    // }

    // const customLayer = {
    //   id: '3d-model',
    //   type: 'custom',
    //   renderingMode: '3d',
    //   onAdd: function (map, gl) {
    //     this.camera = new THREE.Camera()
    //     this.scene = new THREE.Scene()

    //     const directionalLight = new THREE.DirectionalLight(0xffffff)
    //     directionalLight.position.set(0, -70, 100).normalize()
    //     this.scene.add(directionalLight)

    //     const directionalLight2 = new THREE.DirectionalLight(0xffffff)
    //     directionalLight2.position.set(0, 70, 100).normalize()
    //     this.scene.add(directionalLight2)

    //     const loader = new OBJLoader()
    //     // const loader2 = new GLTFLoader()
    //     // loader2.load(
    //     //   'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
    //     //   (gltf) => {
    //     //     this.scene.add(gltf.scene)
    //     //     console.log(gltf)
    //     //   }
    //     // )

    //     // const loader3 = new GLTFLoader()
    //     // loader3.load(
    //     //   '3dbag1.gltf',
    //     //   (gltf) => {
    //     //     this.scene.add(gltf.scene)
    //     //     console.log(gltf)
    //     //   }
    //     // )
    //     loader.load(
    //       '3dbag1.obj',
    //       (obj) => {
    //         obj.scale.y = 50
    //         obj.scale.z = 0.5 
    //         this.scene.add(obj)
    //         console.log(obj)
    //         console.log(this.scene)
    //       },
    //       (xhr) => {
    //         // console.log(xhr)
    //       },
    //       (err) => {
    //         console.log(err)
    //       }
    //     )
    //     this.map = map

    //     this.renderer = new THREE.WebGLRenderer({
    //       canvas: map.getCanvas(),
    //       context: gl,
    //       antialias: true
    //     })

    //     this.renderer.autoClear = false
    //   },
    //   render: function (gl, matrix) {
    //     const rotationX = new THREE.Matrix4().makeRotationAxis(
    //       new THREE.Vector3(1, 0, 0),
    //       modelTransform.rotateX
    //     );
    //     const rotationY = new THREE.Matrix4().makeRotationAxis(
    //       new THREE.Vector3(0, 1, 0),
    //       modelTransform.rotateY
    //     );
    //     const rotationZ = new THREE.Matrix4().makeRotationAxis(
    //       new THREE.Vector3(0, 0, 1),
    //       modelTransform.rotateZ
    //     );

    //     const m = new THREE.Matrix4().fromArray(matrix);
    //     const l = new THREE.Matrix4()
    //       .makeTranslation(
    //         modelTransform.translateX,
    //         modelTransform.translateY,
    //         modelTransform.translateZ
    //       )
    //       .scale(
    //         new THREE.Vector3(
    //           modelTransform.scale,
    //           -modelTransform.scale,
    //           modelTransform.scale
    //         )
    //       )
    //       .multiply(rotationX)
    //       .multiply(rotationY)
    //       .multiply(rotationZ);

    //     this.camera.projectionMatrix = m.multiply(l);
    //     this.renderer.resetState();
    //     this.renderer.render(this.scene, this.camera);
    //     this.map.triggerRepaint();
    //   }
    // };

    // map.on('style.load', () => {
    //   map.addLayer(customLayer, 'waterway-label');
    // });

    const mapOptions = {
      center: {
        // lng: -122.34378755092621,
        lng: 5.38764,
        lat: 52.15616
        // lat: 47.607465080615476
      },
      mapId: 'dc15dc155ec03ac6',
      zoom: 18,
      heading: 45,
      tilt: 67,
    }
    const scene = new THREE.Scene()
    const map = new window.google.maps.Map(ref.current, mapOptions)

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16)
    const boxMaterial = new THREE.MeshNormalMaterial()
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    boxMesh.position.copy(latLngToVector3(mapOptions.center))
    boxMesh.position.setY(45)
    scene.add(boxMesh)

    const directionalLight = new THREE.DirectionalLight(0xffffff)
        directionalLight.position.set(0, -70, 100).normalize()
        scene.add(directionalLight)

        const directionalLight2 = new THREE.DirectionalLight(0xffffff)
        directionalLight2.position.set(0, 70, 100).normalize()
        scene.add(directionalLight2)

    const loader = new OBJLoader()
    loader.load('/3dbag1.obj',
      (obj) => {
        obj.position.copy(latLngToVector3(mapOptions.center))
        obj.position.setY(45)
        scene.add(obj)
        console.log(obj)
      }
    )

    var objVar;

    loader.load('/pointer.obj',
    (obj) => {
      obj.scale.x = 0.1
      obj.scale.y = 0.1
      obj.scale.z = 0.1
      obj.position.copy(latLngToVector3(mapOptions.center))
      obj.position.setY(85)
      scene.add(obj)
      objVar = obj
      console.log(obj)
    })


    new ThreeJSOverlayView({
      scene,
      map,
      THREE
    });


    const animate = () => {
      boxMesh.rotation.x += 0.001
      boxMesh.rotation.y += 0.001
      if (objVar) {
      objVar.rotation.y += 0.01
      }
      // controls.update()
      // renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])
return (
  <div ref={ref} id='map'></div>
)
}

function App() {




  useEffect(() => {


    // const camera = new THREE.PerspectiveCamera(
    //   50,
    //   window.innerWidth / window.innerHeight,
    //   1,
    //   1000
    // )
    // camera.position.z = 96

    // const canvas = document.getElementById('canvas')
    // const renderer = new THREE.WebGLRenderer({
    //   antialias: true
    // })
    // renderer.setSize(window.innerWidth, window.innerHeight)
    // document.body.appendChild(renderer.domElement)

    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    // ambientLight.castShadow = true
    // scene.add(ambientLight)

    // const spotLight = new THREE.SpotLight(0xffffff, 1)
    // spotLight.castShadow = true
    // spotLight.position.set(0, 64, 32)
    // scene.add(spotLight)



    // const controls = new OrbitControls(camera, renderer.domElement)

    // const resize = () => {
    //   const width = window.innerWidth
    //   const height = window.innerHeight
    //   renderer.setSize(width, height)
    //   camera.aspect = width / height

    //   camera.updateProjectionMatrix()
    // }

    // resize()

    // window.addEventListener('resize', resize)


    // renderer.setAnimationLoop(animate)
  }, [])










  return (
    <>
      <Wrapper apiKey={'AIzaSyAnzlq9yYSHWTqiw3BHC_utiL60Adf5MCI'}>
        <div>

        </div>
        <div>

        </div>
      <WrapperComponent />
    </Wrapper>
      {/* <div>
        <WrapperComponent />
      </div> */}
    </>

  );
}

export default App;
