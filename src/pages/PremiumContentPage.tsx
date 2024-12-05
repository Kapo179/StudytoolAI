// src/pages/PremiumContentPage.tsx
'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Users, GraduationCap, ChevronDown, ChevronUp, Calendar } from 'lucide-react'
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Organization {
  id: string
  name: string
  type: 'society' | 'sorority' | 'fraternity'
  members: number
  scheduleLink: string
}

interface University {
  id: string
  name: string
  location: string
  studentCount: number
  ranking: number
  organizations: Organization[]
  logo: string
}

const universities: University[] = [
    {
        id: '1',
        name: 'Harvard University',
        location: 'Cambridge, MA',
        studentCount: 23000,
        ranking: 1,
        logo: 'https://img.logo.dev/harvard.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ&size=25&retina=true',
        organizations: [
          { id: '1', name: 'Hasty Pudding Club', type: 'society', members: 200, scheduleLink: 'https://hastypudding.org/' },
          { id: '2', name: 'The Seneca', type: 'society', members: 50, scheduleLink: 'https://www.theseneca.org/' },
          { id: '3', name: 'Alpha Phi', type: 'sorority', members: 80, scheduleLink: 'https://www.alphaphi.org/' },
          { id: '4', name: 'Sigma Chi', type: 'fraternity', members: 70, scheduleLink: 'https://www.sigmachi.org/' },
        ]
      },
      {
        id: '2',
        name: 'Stanford University',
        location: 'Stanford, CA',
        studentCount: 17000,
        ranking: 2,
        logo: 'https://img.logo.dev/stanford.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '5', name: 'Stanford AI Club', type: 'society', members: 150, scheduleLink: 'https://ai.stanford.edu/' },
          { id: '6', name: 'Kappa Alpha Theta', type: 'sorority', members: 90, scheduleLink: 'https://www.kappaalphatheta.org/' },
          { id: '7', name: 'Sigma Nu', type: 'fraternity', members: 85, scheduleLink: 'https://www.sigmanu.org/' },
        ]
      },
      {
        id: '3',
        name: 'Massachusetts Insti... (MIT)',
        location: 'Cambridge, MA',
        studentCount: 11000,
        ranking: 3,
        logo: 'https://img.logo.dev/mit.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '8', name: 'MIT Energy Club', type: 'society', members: 200, scheduleLink: 'https://mitenergyclub.org/' },
          { id: '9', name: 'Alpha Chi Omega', type: 'sorority', members: 75, scheduleLink: 'https://www.alphachiomega.org/' },
          { id: '10', name: 'Phi Beta Epsilon', type: 'fraternity', members: 60, scheduleLink: 'https://pbe.mit.edu/' },
        ]
      },
      {
        id: '4',
        name: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        studentCount: 42000,
        ranking: 4,
        logo: 'https://img.logo.dev/berkeley.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '11', name: 'Berkeley Political Review', type: 'society', members: 100, scheduleLink: 'https://bpr.berkeley.edu/' },
          { id: '12', name: 'Delta Delta Delta', type: 'sorority', members: 85, scheduleLink: 'https://www.tridelta.org/' },
          { id: '13', name: 'Theta Chi', type: 'fraternity', members: 70, scheduleLink: 'https://www.thetachi.org/' },
        ]
      },
      {
        id: '5',
        name: 'Yale University',
        location: 'New Haven, CT',
        studentCount: 13000,
        ranking: 5,
        logo: 'https://img.logo.dev/yale.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '14', name: 'Yale Political Union', type: 'society', members: 150, scheduleLink: 'https://ypu.yale.edu/' },
          { id: '15', name: 'Kappa Kappa Gamma', type: 'sorority', members: 80, scheduleLink: 'https://www.kappakappagamma.org/' },
          { id: '16', name: 'Alpha Delta Phi', type: 'fraternity', members: 65, scheduleLink: 'https://www.alphadeltaphi.org/' },
        ]
      },
      {
        id: '6',
        name: 'Princeton University',
        location: 'Princeton, NJ',
        studentCount: 8000,
        ranking: 6,
        logo: 'https://img.logo.dev/princeton.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '17', name: 'Princeton University Band', type: 'society', members: 100, scheduleLink: 'https://pub.princeton.edu/' },
          { id: '18', name: 'Pi Beta Phi', type: 'sorority', members: 70, scheduleLink: 'https://www.pibetaphi.org/' },
          { id: '19', name: 'Tiger Inn', type: 'fraternity', members: 60, scheduleLink: 'https://tigerinn.princeton.edu/' },
        ]
      },
      {
        id: '7',
        name: 'University of Chicago',
        location: 'Chicago, IL',
        studentCount: 16000,
        ranking: 7,
        logo: 'https://img.logo.dev/uc3p.org?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '20', name: 'UChicago Debate Society', type: 'society', members: 90, scheduleLink: 'https://debate.uchicago.edu/' },
          { id: '21', name: 'Alpha Phi Omega', type: 'society', members: 120, scheduleLink: 'https://apo.org/' },
          { id: '22', name: 'Delta Upsilon', type: 'fraternity', members: 50, scheduleLink: 'https://deltau.org/' },
        ]
      },
      {
        id: '8',
        name: 'University of Pennsylvania',
        location: 'Philadelphia, PA',
        studentCount: 22000,
        ranking: 8,
        logo: 'https://img.logo.dev/upenn.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '23', name: 'Penn Robotics', type: 'society', members: 150, scheduleLink: 'https://www.pennrobotics.org/' },
          { id: '24', name: 'Theta Tau', type: 'fraternity', members: 60, scheduleLink: 'https://thetatau.org/' },
          { id: '25', name: 'Kappa Alpha Theta', type: 'sorority', members: 75, scheduleLink: 'https://www.kappaalphatheta.org/' },
        ]
      },
      {
        id: '9',
        name: 'Duke University',
        location: 'Durham, NC',
        studentCount: 15000,
        ranking: 9,
        logo: 'https://img.logo.dev/duke.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '26', name: 'Duke Science Club', type: 'society', members: 120, scheduleLink: 'https://science.duke.edu/' },
          { id: '27', name: 'Delta Gamma', type: 'sorority', members: 80, scheduleLink: 'https://www.deltagamma.org/' },
          { id: '28', name: 'Sigma Phi Epsilon', type: 'fraternity', members: 65, scheduleLink: 'https://www.sigep.org/' },
        ]
      },
      {
        id: '10',
        name: 'California Institute of Technology (Caltech)',
        location: 'Pasadena, CA',
        studentCount: 2500,
        ranking: 10,
        logo: 'https://img.logo.dev/caltech.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '29', name: 'Caltech Astronomy Club', type: 'society', members: 40, scheduleLink: 'https://astro.caltech.edu/' },
          { id: '30', name: 'Pi Beta Phi', type: 'sorority', members: 30, scheduleLink: 'https://www.pibetaphi.org/' },
          { id: '31', name: 'Alpha Sigma Phi', type: 'fraternity', members: 35, scheduleLink: 'https://alphasigmaphi.org/' },
        ]
      },
      {
        id: '11',
        name: 'University of Ca... (UCLA)',
        location: 'Los Angeles, CA',
        studentCount: 45000,
        ranking: 11,
        logo: 'https://img.logo.dev/ucop.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '32', name: 'UCLA Robotics Club', type: 'society', members: 200, scheduleLink: 'https://robotics.ucla.edu/' },
          { id: '33', name: 'Delta Zeta', type: 'sorority', members: 100, scheduleLink: 'https://www.deltazeta.org/' },
          { id: '34', name: 'Zeta Beta Tau', type: 'fraternity', members: 75, scheduleLink: 'https://www.zbt.org/' },
        ]
      },
      {
        id: '12',
        name: 'University of Michigan',
        location: 'Ann Arbor, MI',
        studentCount: 46000,
        ranking: 12,
        logo: 'https://img.logo.dev/umich.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '35', name: 'Michigan Debate Society', type: 'society', members: 140, scheduleLink: 'https://debate.umich.edu/' },
          { id: '36', name: 'Alpha Chi Omega', type: 'sorority', members: 85, scheduleLink: 'https://www.alphachiomega.org/' },
          { id: '37', name: 'Theta Xi', type: 'fraternity', members: 70, scheduleLink: 'https://thetaxi.org/' },
        ]
      },
      {
        id: '13',
        name: 'Cornell University',
        location: 'Ithaca, NY',
        studentCount: 25000,
        ranking: 13,
        logo: 'https://img.logo.dev/cornell.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '38', name: 'Cornell Robotics Club', type: 'society', members: 150, scheduleLink: 'https://www.cornellrobotics.org/' },
          { id: '39', name: 'Kappa Delta', type: 'sorority', members: 90, scheduleLink: 'https://www.kappadelta.org/' },
          { id: '40', name: 'Delta Chi', type: 'fraternity', members: 70, scheduleLink: 'https://www.deltachi.org/' },
        ]
      },
      {
        id: '14',
        name: 'University of Texas at Austin',
        location: 'Austin, TX',
        studentCount: 51000,
        ranking: 14,
        logo: 'https://img.logo.dev/utlsf.org?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '41', name: 'Texas Political Union', type: 'society', members: 200, scheduleLink: 'https://politicalunion.texas.edu/' },
          { id: '42', name: 'Alpha Delta Pi', type: 'sorority', members: 100, scheduleLink: 'https://www.alphadeltapi.org/' },
          { id: '43', name: 'Phi Kappa Psi', type: 'fraternity', members: 85, scheduleLink: 'https://www.phikappapsi.com/' },
        ]
      },
      {
        id: '15',
        name: 'University of Southern California (USC)',
        location: 'Los Angeles, CA',
        studentCount: 48000,
        ranking: 15,
        logo: 'https://img.logo.dev/usc.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '44', name: 'USC Code Society', type: 'society', members: 180, scheduleLink: 'https://usc.codesociety.org/' },
          { id: '45', name: 'Gamma Phi Beta', type: 'sorority', members: 120, scheduleLink: 'https://www.gammaphibeta.org/' },
          { id: '46', name: 'Sigma Alpha Epsilon', type: 'fraternity', members: 100, scheduleLink: 'https://www.sae.net/' },
        ]
      },
      {
        id: '16',
        name: 'University of North Carolina at Chapel Hill',
        location: 'Chapel Hill, NC',
        studentCount: 31000,
        ranking: 16,
        logo: 'https://img.logo.dev/unc.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '47', name: 'UNC Debate Society', type: 'society', members: 120, scheduleLink: 'https://debate.unc.edu/' },
          { id: '48', name: 'Zeta Tau Alpha', type: 'sorority', members: 110, scheduleLink: 'https://zetataualpha.org/' },
          { id: '49', name: 'Phi Gamma Delta (Fiji)', type: 'fraternity', members: 80, scheduleLink: 'https://www.phigam.org/' },
        ]
      },
      {
        id: '17',
        name: 'University of Washington',
        location: 'Seattle, WA',
        studentCount: 47000,
        ranking: 17,
        logo: 'https://img.logo.dev/uwcme.org?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '50', name: 'Husky Robotics', type: 'society', members: 220, scheduleLink: 'https://www.huskyrobotics.org/' },
          { id: '51', name: 'Alpha Gamma Delta', type: 'sorority', members: 90, scheduleLink: 'https://alphagammadelta.org/' },
          { id: '52', name: 'Sigma Chi', type: 'fraternity', members: 85, scheduleLink: 'https://www.sigmachi.org/' },
        ]
      },
      {
        id: '18',
        name: 'Northwestern University',
        location: 'Evanston, IL',
        studentCount: 22000,
        ranking: 18,
        logo: 'https://img.logo.dev/northwestern.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '53', name: 'Northwestern Engineering Society', type: 'society', members: 140, scheduleLink: 'https://engineering.northwestern.edu/' },
          { id: '54', name: 'Kappa Kappa Gamma', type: 'sorority', members: 95, scheduleLink: 'https://www.kappakappagamma.org/' },
          { id: '55', name: 'Beta Theta Pi', type: 'fraternity', members: 70, scheduleLink: 'https://www.betathetapi.org/' },
        ]
      },
      {
        id: '19',
        name: 'University of Virginia (UVA)',
        location: 'Charlottesville, VA',
        studentCount: 25000,
        ranking: 19,
        logo: 'https://img.logo.dev/uvastudco.com?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '56', name: 'Jefferson Literary and Debating Society', type: 'society', members: 180, scheduleLink: 'https://www.jeffersonsociety.org/' },
          { id: '57', name: 'Chi Omega', type: 'sorority', members: 90, scheduleLink: 'https://www.chiomega.com/' },
          { id: '58', name: 'Theta Chi', type: 'fraternity', members: 80, scheduleLink: 'https://www.thetachi.org/' },
        ]
      },
      {
        id: '20',
        name: 'University of Notre Dame',
        location: 'Notre Dame, IN',
        studentCount: 12000,
        ranking: 20,
        logo: 'https://img.logo.dev/nd.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '59', name: 'Notre Dame Investment Club', type: 'society', members: 160, scheduleLink: 'https://investmentclub.nd.edu/' },
          { id: '60', name: 'Pi Beta Phi', type: 'sorority', members: 70, scheduleLink: 'https://www.pibetaphi.org/' },
          { id: '61', name: 'Delta Sigma Phi', type: 'fraternity', members: 60, scheduleLink: 'https://www.deltasig.org/' },
        ]
      },
      {
        id: '21',
        name: 'University of Florida',
        location: 'Gainesville, FL',
        studentCount: 56000,
        ranking: 21,
        logo: 'https://img.logo.dev/ufl.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '62', name: 'Florida Robotics Club', type: 'society', members: 200, scheduleLink: 'https://robotics.ufl.edu/' },
          { id: '63', name: 'Delta Delta Delta', type: 'sorority', members: 95, scheduleLink: 'https://www.tridelta.org/' },
          { id: '64', name: 'Sigma Phi Epsilon', type: 'fraternity', members: 80, scheduleLink: 'https://www.sigep.org/' },
        ]
      },
      {
        id: '22',
        name: 'University of Wisconsin-Madison',
        location: 'Madison, WI',
        studentCount: 47000,
        ranking: 22,
        logo: 'https://img.logo.dev/uwm.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '65', name: 'Wisconsin Engineering Society', type: 'society', members: 160, scheduleLink: 'https://engineering.wisc.edu/' },
          { id: '66', name: 'Kappa Alpha Theta', type: 'sorority', members: 90, scheduleLink: 'https://www.kappaalphatheta.org/' },
          { id: '67', name: 'Theta Chi', type: 'fraternity', members: 75, scheduleLink: 'https://www.thetachi.org/' },
        ]
      },
      {
        id: '23',
        name: 'Vanderbilt University',
        location: 'Nashville, TN',
        studentCount: 13000,
        ranking: 23,
        logo: 'https://img.logo.dev/vanderbilt.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '68', name: 'Vanderbilt Debate Society', type: 'society', members: 120, scheduleLink: 'https://debate.vanderbilt.edu/' },
          { id: '69', name: 'Alpha Chi Omega', type: 'sorority', members: 80, scheduleLink: 'https://www.alphachiomega.org/' },
          { id: '70', name: 'Beta Theta Pi', type: 'fraternity', members: 70, scheduleLink: 'https://www.betathetapi.org/' },
        ]
      },
      {
        id: '24',
        name: 'Ohio State University',
        location: 'Columbus, OH',
        studentCount: 61000,
        ranking: 24,
        logo: 'https://img.logo.dev/ohiostatepress.org?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '71', name: 'OSU Robotics Club', type: 'society', members: 220, scheduleLink: 'https://robotics.osu.edu/' },
          { id: '72', name: 'Gamma Phi Beta', type: 'sorority', members: 100, scheduleLink: 'https://www.gammaphibeta.org/' },
          { id: '73', name: 'Sigma Chi', type: 'fraternity', members: 85, scheduleLink: 'https://www.sigmachi.org/' },
        ]
      },
      {
        id: '25',
        name: 'University of California, San Diego (UCSD)',
        location: 'San Diego, CA',
        studentCount: 40000,
        ranking: 25,
        logo: 'https://img.logo.dev/universityofcalifornia.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '74', name: 'Triton AI Society', type: 'society', members: 150, scheduleLink: 'https://ai.ucsd.edu/' },
          { id: '75', name: 'Zeta Tau Alpha', type: 'sorority', members: 85, scheduleLink: 'https://zetataualpha.org/' },
          { id: '76', name: 'Delta Sigma Phi', type: 'fraternity', members: 70, scheduleLink: 'https://www.deltasig.org/' },
        ]
      },
      {
        id: '26',
        name: 'Boston University (BU)',
        location: 'Boston, MA',
        studentCount: 34000,
        ranking: 26,
        logo: 'https://img.logo.dev/bu.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '77', name: 'BU Debate Club', type: 'society', members: 100, scheduleLink: 'https://debate.bu.edu/' },
          { id: '78', name: 'Delta Zeta', type: 'sorority', members: 90, scheduleLink: 'https://www.deltazeta.org/' },
          { id: '79', name: 'Sigma Nu', type: 'fraternity', members: 75, scheduleLink: 'https://www.sigmanu.org/' },
        ]
      },
      {
        id: '27',
        name: 'Georgia Institute of Technology (Georgia Tech)',
        location: 'Atlanta, GA',
        studentCount: 40000,
        ranking: 27,
        logo: 'https://img.logo.dev/gatech.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '80', name: 'Georgia Tech Robotics Club', type: 'society', members: 210, scheduleLink: 'https://robotics.gatech.edu/' },
          { id: '81', name: 'Alpha Gamma Delta', type: 'sorority', members: 90, scheduleLink: 'https://alphagammadelta.org/' },
          { id: '82', name: 'Phi Delta Theta', type: 'fraternity', members: 80, scheduleLink: 'https://www.phideltatheta.org/' },
        ]
      },
      {
        id: '28',
        name: 'University of Minnesota',
        location: 'Minneapolis, MN',
        studentCount: 51000,
        ranking: 28,
        logo: 'https://img.logo.dev/umn.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '83', name: 'Minnesota Debate Union', type: 'society', members: 140, scheduleLink: 'https://debate.umn.edu/' },
          { id: '84', name: 'Pi Beta Phi', type: 'sorority', members: 85, scheduleLink: 'https://www.pibetaphi.org/' },
          { id: '85', name: 'Theta Chi', type: 'fraternity', members: 75, scheduleLink: 'https://www.thetachi.org/' },
        ]
      },
      {
        id: '29',
        name: 'Pennsylvania State University (Penn State)',
        location: 'University Park, PA',
        studentCount: 91000,
        ranking: 29,
        logo: 'https://upload.wikimedia.org/wikipedia/en/7/7d/Pennsylvania_State_University_seal.svg',
        organizations: [
          { id: '86', name: 'Penn State Robotics Society', type: 'society', members: 230, scheduleLink: 'https://robotics.psu.edu/' },
          { id: '87', name: 'Kappa Delta', type: 'sorority', members: 100, scheduleLink: 'https://www.kappadelta.org/' },
          { id: '88', name: 'Delta Chi', type: 'fraternity', members: 90, scheduleLink: 'https://www.deltachi.org/' },
        ]
      },
      {
        id: '30',
        name: 'University of Arizona',
        location: 'Tucson, AZ',
        studentCount: 45000,
        ranking: 30,
        logo: 'https://img.logo.dev/escuofa.com?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '89', name: 'Arizona AI Club', type: 'society', members: 170, scheduleLink: 'https://ai.arizona.edu/' },
          { id: '90', name: 'Alpha Phi', type: 'sorority', members: 95, scheduleLink: 'https://www.alphaphi.org/' },
          { id: '91', name: 'Sigma Alpha Epsilon', type: 'fraternity', members: 80, scheduleLink: 'https://www.sae.net/' },
        ]
      },
      {
        id: '31',
        name: 'University of Illinois Urbana-Champaign (UIUC)',
        location: 'Urbana, IL',
        studentCount: 56000,
        ranking: 31,
        logo: 'https://img.logo.dev/uis.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '92', name: 'UIUC Engineering Society', type: 'society', members: 220, scheduleLink: 'https://engineering.illinois.edu/' },
          { id: '93', name: 'Kappa Kappa Gamma', type: 'sorority', members: 90, scheduleLink: 'https://www.kappakappagamma.org/' },
          { id: '94', name: 'Phi Delta Theta', type: 'fraternity', members: 85, scheduleLink: 'https://www.phideltatheta.org/' },
        ]
      },
      {
        id: '32',
        name: 'Purdue University',
        location: 'West Lafayette, IN',
        studentCount: 49000,
        ranking: 32,
        logo: 'https://img.logo.dev/purdue.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '95', name: 'Purdue Robotics Club', type: 'society', members: 210, scheduleLink: 'https://robotics.purdue.edu/' },
          { id: '96', name: 'Gamma Phi Beta', type: 'sorority', members: 100, scheduleLink: 'https://www.gammaphibeta.org/' },
          { id: '97', name: 'Sigma Nu', type: 'fraternity', members: 75, scheduleLink: 'https://www.sigmanu.org/' },
        ]
      },
      {
        id: '33',
        name: 'University of Colorado Boulder',
        location: 'Boulder, CO',
        studentCount: 37000,
        ranking: 33,
        logo: 'https://img.logo.dev/cubuffs.com?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '98', name: 'CU Boulder Debate Club', type: 'society', members: 140, scheduleLink: 'https://debate.colorado.edu/' },
          { id: '99', name: 'Pi Beta Phi', type: 'sorority', members: 85, scheduleLink: 'https://www.pibetaphi.org/' },
          { id: '100', name: 'Theta Xi', type: 'fraternity', members: 80, scheduleLink: 'https://www.thetaxi.org/' },
        ]
      },
      {
        id: '34',
        name: 'University of Alabama',
        location: 'Tuscaloosa, AL',
        studentCount: 38000,
        ranking: 34,
        logo: 'https://img.logo.dev/aamu.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '101', name: 'Crimson Tide Robotics', type: 'society', members: 190, scheduleLink: 'https://robotics.ua.edu/' },
          { id: '102', name: 'Delta Zeta', type: 'sorority', members: 90, scheduleLink: 'https://www.deltazeta.org/' },
          { id: '103', name: 'Sigma Chi', type: 'fraternity', members: 85, scheduleLink: 'https://www.sigmachi.org/' },
        ]
      },
      {
        id: '35',
        name: 'University of Oregon',
        location: 'Eugene, OR',
        studentCount: 22000,
        ranking: 35,
        logo: 'https://img.logo.dev/uoregon.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '104', name: 'Oregon Robotics Club', type: 'society', members: 150, scheduleLink: 'https://robotics.uoregon.edu/' },
          { id: '105', name: 'Zeta Tau Alpha', type: 'sorority', members: 80, scheduleLink: 'https://zetataualpha.org/' },
          { id: '106', name: 'Delta Chi', type: 'fraternity', members: 70, scheduleLink: 'https://www.deltachi.org/' },
        ]
      },
      {
        id: '36',
        name: 'University of Kansas',
        location: 'Lawrence, KS',
        studentCount: 28000,
        ranking: 36,
        logo: 'https://img.logo.dev/kumc.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '107', name: 'KU Debate Society', type: 'society', members: 140, scheduleLink: 'https://debate.ku.edu/' },
          { id: '108', name: 'Kappa Delta', type: 'sorority', members: 85, scheduleLink: 'https://www.kappadelta.org/' },
          { id: '109', name: 'Phi Gamma Delta', type: 'fraternity', members: 75, scheduleLink: 'https://www.phigam.org/' },
        ]
      },
      {
        id: '37',
        name: 'Texas A&M University',
        location: 'College Station, TX',
        studentCount: 72000,
        ranking: 37,
        logo: 'https://img.logo.dev/tamuc.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '110', name: 'Texas A&M AI Society', type: 'society', members: 230, scheduleLink: 'https://ai.tamu.edu/' },
          { id: '111', name: 'Alpha Gamma Delta', type: 'sorority', members: 100, scheduleLink: 'https://alphagammadelta.org/' },
          { id: '112', name: 'Beta Theta Pi', type: 'fraternity', members: 85, scheduleLink: 'https://www.betathetapi.org/' },
        ]
      },
      {
        id: '38',
        name: 'University of Utah',
        location: 'Salt Lake City, UT',
        studentCount: 32000,
        ranking: 38,
        logo: 'https://img.logo.dev/utah.edu?token=pk_bZXTGVp4RhWL3Dc4cv-FgQ',
        organizations: [
          { id: '113', name: 'Utah Robotics Club', type: 'society', members: 170, scheduleLink: 'https://robotics.utah.edu/' },
          { id: '114', name: 'Gamma Phi Beta', type: 'sorority', members: 80, scheduleLink: 'https://www.gammaphibeta.org/' },
          { id: '115', name: 'Theta Chi', type: 'fraternity', members: 75, scheduleLink: 'https://www.thetachi.org/' },
        ]
      }      
]

export default function UniversityOrganizationsTable() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [expandedUniversity, setExpandedUniversity] = React.useState<string | null>(null)
  

  const filteredUniversities = universities.filter(uni => 
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleExpand = (universityId: string) => {
    setExpandedUniversity(expandedUniversity === universityId ? null : universityId)
  }

  return (
    <ThemeProvider defaultTheme="system">
      <div className="max-w-[1200px] mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Universities and Organizations</h1>
            <p className="text-muted-foreground mt-2">Browse universities, societies, and sororities</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search universities..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">University</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Students</TableHead>
                <TableHead className="text-right">Ranking</TableHead>
                <TableHead className="text-right">Organizations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUniversities.map((university) => (
                <React.Fragment key={university.id}>
                  <TableRow>
                    <TableCell className="font-medium">
                      <Button
                        variant="ghost"
                        onClick={() => toggleExpand(university.id)}
                        className="p-0 hover:bg-transparent"
                      >
                        <span className="flex items-center gap-2">
                          {expandedUniversity === university.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          <img
                            src={university.logo}
                            alt={`${university.name} logo`}
                            width={40}
                            height={40}
                            className="rounded-full border border-gray-200 bg-white overflow-hidden shadow-lg transform scale-105"
                          />
                          {university.name}
                        </span>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {university.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {university.studentCount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        #{university.ranking}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{university.organizations.length}</TableCell>
                  </TableRow>
                  {expandedUniversity === university.id && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <div className="p-6 bg-background border rounded-lg shadow-sm">
                          <h3 className="text-lg font-semibold mb-4">Organizations</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-3">Societies</h4>
                              <ul className="space-y-3">
                                {university.organizations
                                  .filter(org => org.type === 'society')
                                  .map(society => (
                                    <li key={society.id} className="bg-muted rounded-lg p-3 flex items-center justify-between">
                                      <div>
                                        <p className="font-medium">{society.name}</p>
                                        <p className="text-sm text-muted-foreground">{society.members} members</p>
                                      </div>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="sm">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Schedule
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Schedule a Meeting with {society.name}</DialogTitle>
                                          </DialogHeader>
                                          <div className="flex items-center space-x-4 py-4">
                                            <img
                                              src={university.logo}
                                              alt={`${university.name} logo`}
                                              width={60}
                                              height={60}
                                              className="rounded-full border border-gray-200 bg-white overflow-hidden shadow-lg transform scale-105"
                                            />
                                            <div>
                                              <h4 className="font-semibold">{university.name}</h4>
                                              <p className="text-sm text-muted-foreground">{society.name}</p>
                                            </div>
                                          </div>
                                          <p className="text-sm text-muted-foreground">
                                            Use the link below to schedule a meeting with {society.name}.
                                          </p>
                                          <a
                                            href={society.scheduleLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full mt-4"
                                          >
                                            Open Scheduling Page
                                          </a>
                                        </DialogContent>
                                      </Dialog>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-3">Sororities</h4>
                              <ul className="space-y-3">
                                {university.organizations
                                  .filter(org => org.type === 'sorority')
                                  .map(sorority => (
                                    <li key={sorority.id} className="bg-muted rounded-lg p-3 flex items-center justify-between">
                                      <div>
                                        <p className="font-medium">{sorority.name}</p>
                                        <p className="text-sm text-muted-foreground">{sorority.members} members</p>
                                      </div>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="sm">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Schedule
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Schedule a Meeting with {sorority.name}</DialogTitle>
                                          </DialogHeader>
                                          <div className="flex items-center space-x-4 py-4">
                                            <img
                                              src={university.logo}
                                              alt={`${university.name} logo`}
                                              width={60}
                                              height={60}
                                              className="rounded-full border border-gray-200 bg-white overflow-hidden shadow-lg transform scale-105"
                                            />
                                            <div>
                                              <h4 className="font-semibold">{university.name}</h4>
                                              <p className="text-sm text-muted-foreground">{sorority.name}</p>
                                            </div>
                                          </div>
                                          <p className="text-sm text-muted-foreground">
                                            Use the link below to schedule a meeting with {sorority.name}.
                                          </p>
                                          <a
                                            href={sorority.scheduleLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 w-full mt-4"
                                          >
                                            Open Scheduling Page
                                          </a>
                                        </DialogContent>
                                      </Dialog>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ThemeProvider>
  )
}