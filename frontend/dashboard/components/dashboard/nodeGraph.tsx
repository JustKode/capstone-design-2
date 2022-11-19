import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { select, drag, forceSimulation, forceCenter, forceLink, forceManyBody, forceCollide, SimulationLinkDatum, SimulationNodeDatum, Simulation } from "d3"

const MainContainer = styled.div`
  text-align: center;
`

const MainSvg = styled.svg`
  width: 500px;
  height: 500px;

  .node-label { 
    font-size: 14px; 
    font-weight: bold; 
    color:#111; 
    stroke: white;
    stroke-width: 1.5px;
    paint-order: stroke fill; 
    text-anchor: middle;
  }
`

export interface NodeType extends SimulationNodeDatum {
  id: string,
  value: number,
  group: string
}

export interface LinkType extends SimulationLinkDatum<SimulationNodeDatum> {
  source: string,
  target: string,
  value: number
}

export interface NodeGraphProps {
  nodes: NodeType[],
  links: LinkType[]
}

export default function ({nodes, links}: NodeGraphProps) {
  const svgRef = useRef(null)
  const width = 500
  const height = 500

  const fillCircle = (group: string) => {
    if (group === "A") {
      return "#ff3c00";
    } else if (group === "B"){
        return "#386cff";
    } else if (group === "C"){
        return "#6fbc5b";
    } else {
        return "#555";
    }
  }

  const dragNode = (simulation: Simulation<NodeType, undefined>) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
  
  useEffect(() => {
    const svg = select(svgRef.current)

    const gHolder = svg
      .attr("viewBox", [0, 0, width, height])
      .append("g")
      .attr("class", "g-holder")
    
    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-100))
      .force("center", forceCenter(width / 2, height / 2))
      .force("link", forceLink(links).id((node => node.id) as any))
      .force("collide", forceCollide().radius((node => node.value) as any))

    const link = gHolder.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", function(d){ return Math.sqrt(d.value * 5)} );

    const node = gHolder.append("g")
          .attr("class", "circle-node-holder")
          .selectAll("g")
          .data(nodes)
          .enter()
          .append("g")
          .each(function(d){
              select(this)
                .append("circle")
                .attr("r", d.value * 5)
                .attr("fill", fillCircle(d.group))

              select(this)
                  .append("text").text(d.id)
                  .attr("dy",6)
                  .style("text-anchor","middle")
                  .attr("class", "node-label")
              }
            ).call(dragNode(simulation))

    simulation.on("tick", function(){
      link.attr("x1", function(d){ return (d.source as any).x; })
          .attr("y1", function(d){ return (d.source as any).y; })
          .attr("x2", function(d){ return (d.target as any).x; })
          .attr("y2", function(d){ return (d.target as any).y; });
      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });

    svg.node()
  }, [nodes, links])

  return (
    <MainContainer>
      <MainSvg ref={svgRef}>

      </MainSvg>
    </MainContainer>
  )
}