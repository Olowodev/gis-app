import './App.css';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { useEffect } from 'react';
// import markerSprite from './assets/locationmarker.png'
// import { WMSTilesRenderer, WMTSTilesRenderer } from './functions';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {TilesRenderer} from '3d-tiles-renderer'
// import tileSet from './assets/tileset.json'
import { CameraHelper, Group, sRGBEncoding } from 'three';
// import { useEffect} from 'react';

function App() {

  // const tilesUrl = 'http://godzilla.bk.tudelft.nl/3dtiles/ZuidHolland/lod13/tileset1.json'
  // const tilesUrl = './assets/tiles.json'
  // const baseMap = {
  //   type: 'wmts',
  //   options: {
  //     url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
  //     layer: 'standaard',
  //     style: 'default',
  //     tileMatrixSet: 'EPSG:28992',
  //     service: 'WMTS',
  //     request: 'GetTile',
  //     version: '1.0.0',
  //     format: 'image/png'
  //   }
  // }

  // function batchIdHighlightShaderMixin( shader ) {
  //   const newShader = { ...shader }
  //   newShader.uniforms = {
  //     highlightedBatchId: { value: -1 },
  //     highlightColor: { value: new Color( 0xFFC107 ).convertSRGBToLinear() },
  //     ...UniformsUtils.clone( shader.uniforms ),
  //   };
  //   newShader.extensions = {
  //     derivatives: true,
  //   };
  //   newShader.lights = true
  //   newShader.fog = true
  //   newShader.vertexShader =
  //     `
  //       attribute float _batchid;
  //       varying float batchid;
  //     ` +
  //     newShader.vertexShader.replace(
  //       /#include <uv_vertex>/,
  //       `
  //       #include <uv_vertex>
  //       batchid = _batchid;
  //       `
  //     );
  //   newShader.fragmentShader =
  //       `
  //         varying float batchid;
  //         uniform float highlightedBatchId;
  //         uniform vec3 highlightColor;
  //       ` +
  //       newShader.fragmentShader.replace(
  //         /vec4 diffuseColor = vec4\( diffuse, opacity \);/,
  //         `
  //         vec4 diffuseColor =
  //           abs( batchid - highlightedBatchId ) < 0.5 ?
  //           vec4( highlightColor, opacity ) :
  //           vec4( diffuse, opacity );
  //         `
  //       );
  //   return newShader;
  // }

  
  useEffect(() => {
    const scene = new THREE.Scene()
    // let tiles;
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    camera.position.set(400, 400, 400)
    const cameraHelper = new CameraHelper( camera )
    scene.add(cameraHelper)
    // const canvas = document.getElementById('canvas')
    const renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x151c1f)
    renderer.outputEncoding = sRGBEncoding
    document.body.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff)
    dirLight.position.set(1, 2, 3)
    scene.add(dirLight)

    const offsetParent = new Group()
    scene.add(offsetParent)

    const geospatialRotationParent = new Group()
    offsetParent.add(geospatialRotationParent)

    // function reinstantiateTiles () {
    //   if (tiles) {
    //     geospatialRotationParent.remove(tiles.group)
    //     tiles.dispose()
    //   }

    //   tiles = new TilesRenderer(tilesUrl)
    //   tiles.fetchOptions.mode = 'no-cors'
    //   geospatialRotationParent.add(tiles.group)

      
    // }

    // reinstantiateTiles()

    // const boxGeometry = new THREE.BoxGeometry(16, 16, 16)
    // const boxMaterial = new THREE.MeshNormalMaterial()
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    // scene.add(boxMesh)

    const controls = new OrbitControls(camera, renderer.domElement)

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height

      camera.updateProjectionMatrix()
    }

    resize()

    window.addEventListener('resize', resize)

    const tilesRenderer = new TilesRenderer('https://3dbag.nl/download/3dtiles/v210908_fd2cee53/lod22/tileset.json')
    tilesRenderer.setCamera(camera)
    tilesRenderer.setResolutionFromRenderer(camera, renderer)
    scene.add(tilesRenderer.group)

    const animate = () => {
      // boxMesh.rotation.x += 0.01
      // boxMesh.rotation.y += 0.01
      cameraHelper.visible = false
      // tiles.errorTarget = 6
      // tiles.errorThreshold = 60 
      // tiles.loadSiblings = true
      // tiles.optimizeRaycast = true
      // tiles.stopAtEmptyTiles = true
      // tiles.displayActiveTiles = false
      // tiles.maxDepth = 15
      // tiles.displayBoxBounds = false
      // tiles.displaySphereBounds = false
      // tiles.displayRegionBounds = false
      // tiles.colorMode = 0

      // tiles.setCamera(camera)
      // tiles.setResolutionFromRenderer( camera, renderer)
      controls.update()
      camera.updateMatrixWorld()
      tilesRenderer.update()
      renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

  }, [])
  

  

  

  


  // useEffect(() => {
  //   const initScene = () => {
  //     let renderer, scene, offsetParent, camera, dummyCamera, controls, material, box, tiles, sceneTransform = null
  //     // let highlightMaterial, raycaster, mouse, fog, pane, selectedObject, rayIntersect = null
  //     let needsRenderer = 0
  //     // let dirZ = 0 
  //     // let errorTarget = 0
  //     let showTerrain, show3DTiles = true
  //     // let overrideCast, castOnHover, enableFog = false
  //     // let pointerCaster = {
  //     //   startClientX: 0,
  //     //   startClientY: 0
  //     // }
  //     // let lruCacheMinSize = 85
  //     // let lruCacheMaxSize = 115
  //     // let pointIntensity = 0.4
  //     // let directionalIntensity = 0.8
  //     // let ambientIntensity = 0.5
  //     // let dirX = 0.63
  //     // let dirY = 1
  //     // let meshShading = "normal"
  //     // let meshColor = "#c4c8cf"
  //     // let nearPlane = 2
  //     // let farPlane = 300000
  //     // let dummyFarPlane = 3500
  //     // let maxDistShowTiles = 1750 * 1750
  //     // let fogDensity = 0.0004
  //     // let fogColor = "#eeeeee"
  //     // let errorThreshold = 60
  //     let terrainTiles;
  
  //     scene = new Scene()
  //     scene.background = new Color( "#000000" )
  //     // fog = new FogExp2( '#eeeeee', 0.0004 )
  //     material = new ShaderMaterial( batchIdHighlightShaderMixin( ShaderLib.lambert ) )
  //     material.uniforms.diffuse.value = new Color( '#c4c8cf' ).convertSRGBToLinear()
  
  //     let canvas = document.getElementById( "canvas" )
  
  //     renderer = new WebGLRenderer( { antialias: window.devicePixelRatio > 1 ? false : true } )
  //     renderer.setPixelRatio( window.devicePixelRatio )
  //     renderer.setSize( canvas.clientWidth, canvas.clientHeight )
  //     renderer.setClearColor( 0xd9eefc )
  //     renderer.outputEncoding = sRGBEncoding
  //     renderer.autoClear = false
  
  //     canvas.appendChild( renderer.domElement )
  //     camera = new PerspectiveCamera( 30, canvas.clientWidth / canvas.clientHeight, 2, 300000)
  //     camera.position.set( 400, 400, 400 )
  
  //     dummyCamera = new PerspectiveCamera( 30, canvas.clientWidth / canvas.clientHeight, 2, 3500)
      
  //     offsetParent = new Group()
  //     scene.add( offsetParent )
  //     let markerName
  //     tiles = new TilesRenderer( tilesUrl )
  //     box = new Box3()
  
  //     // raycaster = new Raycaster()
  
  //     // mouse = new Vector2()
  
  //     function placeMarkerOnPoint( position ) {
  //       var marker = scene.getObjectByName( markerName )
  //       if ( marker !== "undefined" ) {
  //         scene.remove( marker )
  //       }
  
  //       var textureLoader = new TextureLoader()
  //       var map = textureLoader.load( markerSprite )
  //       var material = new SpriteMaterial( { map: map } )
  //       var sprite = new Sprite( material )
  
  //       material.depthWrite = false
  //       material.depthTest = false
  //       material.sizeAttenuation = false
  //       sprite.position.st( position.x, position.y, position.z )
  //       sprite.scale.set( 0.04, 0.10, 1 )
  //       sprite.name = markerName
  
  //       scene.add( sprite )
  
  //       needsRenderer = 1
  //     }
  
  //     function setCameraPosFromRoute ( q ) {
  //       if ( ! tiles.root ) {
  //         return;
  //       } 
  //       let rd_x = parseFloat( q.rdx )
  //       let rd_y = parseFloat( q.rdy )
  //       let ox = parseFloat( q.ox )
  //       let oy = parseFloat( q.oy )
  //       let oz = parseFloat( q.oz )
  
  //       if ( isNaN( rd_x ) ) {
  //         return;
  //       }
  
  //       let tileset_offset_x = tiles.root.cached.transform.elements[ 12 ]
  //       let tileset_offset_y = tiles.root.cached.transform.elements[ 13 ]
  //       let local_x = rd_x - tileset_offset_x
  //       let local_y = 0
  //       let local_z = - ( rd_y - tileset_offset_y)
  
  //       controls.target.x = local_x
  //       controls.target.z = local_z
  //       camera.position.x = local_x + ox
  //       camera.position.y = local_y + oy
  //       camera.position.z = local_z + oz
  
  //       controls.update()
  
  //       if ( q.placeMarker === 'true' ) {
  
  //         placeMarkerOnPoint( new Vector3( local_x, local_y, local_z ) )
  //         delete q.placeMarker
  //       }
  //     }
  
  
  
  //     function reinitTiles ( init ) {
  //       tiles.displayBoxBounds = true
  //       tiles.colorMode = 7
  //       tiles.lruCache.minSize = 85
  //       tiles.lruCache.maxSize = 115
  
  //       tiles.errorTarget = 0
  //       tiles.errorThreshold = 60 
  //       tiles.loadSiblings = false
  //       tiles.maxDepth = 15
  //       tiles.showEmptyTiles = true
  
  //       tiles.downloadQueue.priorityCallback = tile => 1 / tile.cached.distance
  
  //       tiles.setCamera( dummyCamera )
  //       tiles.setResolutionFromRenderer( dummyCamera, renderer)
  
  //       tiles.onLoadTileSet = () => {
  //         if ( init ) {
  //             // default viewport
  //             setCameraPosFromRoute( {
  //               rdx: "85181.55571255696",
  //               rdy: "446859.38171179296",
  //               ox: "-223.36609616703936",
  //               oy: "281.19798302772574",
  //               oz: "-184.218705413541"
  //             } );
            
  //         }
  //         const transform = this.tiles.root.cached.transform;
  //         sceneTransform = new Vector3( transform.elements[ 12 ], transform.elements[ 13 ], transform.elements[ 14 ] );
  
  //         needsRenderer = 2
  //       };
  //       tiles.onLoadModel = ( s ) => {
  //         // const offset_z = this.tiles.root.cached.transform.elements[ 14 ];
  //         s.traverse( c => {
  //           if ( c.material ) {
  //             c.material.dispose();
  //             c.material = this.material;
  //             if ( c.geometry ) {
  //               c.geometry.computeBoundingBox();
  //               // c.position.y = offset_z;
  //             }
  //           }
  //         } );
  //         needsRenderer = 1
  //       };
  
  //       offsetParent.add( tiles.group )
  //       }
      
  
  //     reinitTiles( true )
  
  //     show3DTiles = true
  
  //     controls = new OrbitControls( camera, renderer.domElement )
  //     controls.screenSpacePanning = false
  //     controls.enableDamping = true
  //     controls.dampingFactor = 0.15
  //     controls.minDistance = 20
  //     controls.maxDistance = 150000
  //     controls.maxPolarAngle = 0.8
  //     controls.mouseButtons = {
  //       LEFT: MOUSE.PAN,
  //       MIDDLE: MOUSE.DOLLY,
  //       RIGHT: MOUSE.ROTATE
  //     }
  //     controls.touches = {
  //       ONE: TOUCH.ROTATE,
  //       TWO: TOUCH.DOLLY_PAN
  //     }
  
  //     const pLight = new PointLight( 0xffffff, 0.4, 0, 1 )
  //     camera.add( pLight )
  //     scene.add( camera )
  
  //     const dirLight = new DirectionalLight( 0xffffff, 0.8 )
  //     dirLight.position.set( 0.63, 1, 0 )
  //     scene.add( dirLight )
  
  //     const ambLight = new AmbientLight( 0xffffff, 0.5 )
  //     scene.add(ambLight)
  
  //     offsetParent.rotation.x = - Math.PI / 2
  
  //     function reinitBasemap () {
  //       if (baseMap.type === "wms" ) {
  //         terrainTiles = new WMSTilesRenderer(
  //           baseMap.options.url,
  //           baseMap.options.layer,
  //           baseMap.options.style
  //         )
  //       } else {
  //         terrainTiles = new WMTSTilesRenderer( baseMap.options, () => needsRenderer = 1)
  //       }
  
  //       offsetParent.add( terrainTiles.group )
  
  //       terrainTiles.onLoadTile = () => needsRenderer = 1
  //     }
  
  //     reinitBasemap()
  
  //     needsRenderer = 1
  
  //     function renderScene () {
  //       requestAnimationFrame( renderScene )
  //       if ( needsRenderer > 0 ) {
  //         needsRenderer --
  
  //         if ( tiles.getBounds( box ) ) {
  //           box.getCenter( tiles.group.position )
  //           tiles.group.position.multiplyScalar( - 1 )
  
  //         }
  
  //         controls.update()
  //         camera.updateMatrixWorld()
  
  //         dummyCamera.matrixWorld.copy( camera.matrixWorld )
  //         dummyCamera.position.copy( camera.position )
  //         dummyCamera.quaternion.copy( camera.quaternion )
  //         dummyCamera.scale.copy( camera.scale )
  //         dummyCamera.far = 
  //         dummyCamera.updateMatrixWorld()
  //         // const lruCacheSize = tiles.lruCache.itemSet.sizeAttenuation
  //         const camdist = camera.position.distanceToSquared( controls.target )
  
  //         if ( camdist < 1750 * 1750 ) {
  //           tiles.update()
  
  //           if ( ! show3DTiles ) {
  //             offsetParent.add( tiles.group )
  //             show3DTiles = true
  //           }
  //         } else {
  //           if ( show3DTiles ) {
  //             offsetParent.remove( tiles.group )
  //             show3DTiles = false
  //           }
  //         }
  
  //         if ( sceneTransform ) {
  //           if ( showTerrain ) {
  //             terrainTiles.update( sceneTransform, camera )
  //           }
  //         }
  
  //         renderer.clear()
  //         renderer.render( scene, camera )
  //       }
  //     }
  
  //     renderScene()
  
  //     function onWindowResize () {
  //       let canvas = document.getElementById( "canvas" )
    
  //       const width = canvas.clientWidth
  //       const height = canvas.clientHeight
    
  //       camera.aspect = width / height
  //       renderer.setSize( width, height )
  
  //       camera.updateProjectionMatrix()
  //       renderer.setPixelRatio( window.devicePixelRatio )
  
  //       needsRenderer = 1
  //     }
  
  //     window.addEventListener( 'resize', onWindowResize, false )
  //   }
  //   initScene()
  // }, [baseMap.options, baseMap.type])
  return (
    <div className="App">
      <div id='canvas'></div>
    </div>
  );
}

export default App;
